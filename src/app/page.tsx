"use client";
import LoginModal from "@/app/components/login";
import '@/app/globals.css';
import Sidebar from "@/app/components/sidebar";
import MessageBox from "@/app/components/messageBox";
import ChatHeader from "@/app/components/chatHeader";
import {useEffect, useMemo, useRef, useState} from "react";
import Embed from "@/app/components/Embed";
import MemberSidebar from "@/app/components/memberSidebar";
import ChatUI from "@/app/components/chat";
import {Chat, Message, User} from "@/types";

import {useSession} from "next-auth/react";
import getUser from "@/app/actions/getUser";
import CreateChatUI from "@/app/components/createChatUI";
import getChats from "@/app/actions/getChats";
import loadMessages from "@/app/actions/loadMessages";
import getChatMembers from "@/app/actions/getChatMembers";
import ProfileView from "@/app/components/profileView";
import io from "socket.io-client";

export default function Home() {
    let [expanded, setExpanded] = useState(false);
    let [className, setClassName] = useState("flex-1 flex flex-col h-full");
    let [memberExpanded, setMemberExpanded] = useState(false);
    let [chatSidebarClass, setChatSidebarClass] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [createChatUI, setCreateChatUI] = useState<boolean>(false);
    const [shareCode, setShareCode] = useState<string | null>(null);
    const [loadingShareCode, setLoadingShareCode] = useState<boolean>(false);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [currentMessageIDX, setCurrentMessageIDX] = useState<number>(0);
    const [currentChatMembers, setCurrentChatMembers] = useState<(User|null)[]>([null, null, null, null, null]);
    const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
    // Get current user
    const {data: session, status} = useSession();

    var socket = io("http://localhost:3001");

    let initialState = [];
    if (user){
        for (let i = 0; i < user.chats.length; i++){
            initialState.push(null);
        }

    } else {
        for (let i = 0; i < 5; i++){
            initialState.push(null);
        }
    }
    const [chats, setChats] = useState<(Chat|null)[]>(initialState);
    const [joinedRooms, setJoinedRooms] = useState<boolean>(false);

    if (!joinedRooms && !chats.includes(null)) {
        for (let i = 0; i < chats.length; i++) {
            socket.emit("join", chats[i]?._id);
        }
        setJoinedRooms(true);
    }

    if (session && session.user && !user){
        getUser("", session.user.email).then((data: string | null) => {
            if (data == null) {
                return;
            }
            setUser(User.convertFromJSON(JSON.parse(data)));
        });
    }

    if (user && chats.includes(null)) {
        getChats(user._id).then((data) => {
            if (data == null) {
                return;
            }
            data = JSON.parse(data);
            if (data == null){
                return;
            }
            let newData = [];
            for (let i = 0; i < data.length; i++){
                newData[i] = Chat.convertFromJSON(data[i]);
            }
            setChats(newData);
        });
    }

    function createChatClient(name: string, mode: string){
        setLoadingShareCode(true);
        if (!user){
            return;
        }
        if (mode == "name") {
            setLoadingShareCode(true);
            socket.emit("new_chat", {
                name: name,
                users: [user._id],
                avatar: user.image,
                owner: user._id,
            });
        } else {
            setLoadingShareCode(true);
            socket.emit("join_chat", {
                chatID: name,
                userID: user._id,
            });
            return;
        }
    }
    socket.on("new_chat", (chat) => {
        let shared = !chat.new;
        const chatData = chat.chat;
        const newChat = Chat.convertFromJSON(chatData);
        setLoadingShareCode(false);
        if (!shared){
            setShareCode(newChat._id);
            setCurrentChatMembers([user]);
        }
        setChats((chats) => {
            let newChats = [...chats];
            newChats.push(newChat);
            getChatMembers(newChat._id).then((data) => {
                    const jsonData = JSON.parse(data as string);
                    setCurrentChatMembers(
                        jsonData.map(
                            (user: Map<string, any>) => (
                                User.convertFromJSON(user)
                            )
                        )
                    );
                }
            );
            return newChats;
        });
        setCurrentChat(newChat);
    });

    socket.on("new_user", (data) => {
        setCurrentChat((curChat) => {
            if (curChat && curChat._id == data.chatID) {
                setCurrentChatMembers((members) => {
                    // TODO: Find a better way to do this instead of ignoring the error
                    if (members.includes(User.convertFromJSON(data.user))){
                        return members;
                    }
                    let newMembers = [...members];
                    newMembers.push(User.convertFromJSON(data.user));
                    return newMembers;
                });
            }
            return curChat;
        });
    });


    function sendMessage(message: string){
        const messageData = {
            content: message,
            sender: user?._id,
            sendDate: new Date().toISOString(),
        }
        setCurrentChat((curChat) => {
            if (curChat) {
                setCurrentMessageIDX(currentMessageIDX + 1);
                const messageObj: Message = Message.convertFromJSON(messageData);

                return Chat.convertFromJSON({
                        "_id": curChat._id,
                        "name": curChat.name,
                        "avatar": curChat.avatar,
                        "users": curChat.users,
                        "owner": curChat.owner,
                        "messages": curChat.messages.concat([messageObj])
                    }
                );
            }
            return curChat;
        });

        const socketMessage = {
            chatID: currentChat?._id,
            message: messageData,
        }


        setCurNotifications(0);
        socket.emit("message", socketMessage);
    }

    let [notifications, setNotifications] = useState<Map<string, number>>(new Map<string, number>());

    if (!chats.includes(null)){
        for (let i = 0; i < chats.length; i++){
            if (!chats[i]){
                break;
            }
            if (notifications.has(chats[i]?._id as string)){
                continue;
            }
            notifications.set(chats[i]?._id as string, 0);
        }
    }

    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("Browser does not support desktop notification");
        } else {
            Notification.requestPermission();
        }
    }, []);



    socket.on("new_message", (message) => {
        setCurrentChat((curChat) => {
            if (curChat) {
                if (curChat._id != message.chatID) {
                    setChats((chats) => {
                        if (chats[0]?._id == message.chatID) {
                            return chats;
                        }
                        let chat = chats.find((chat) => chat?._id == message.chatID);
                        // @ts-ignore
                        new Notification(chat?.name as string, {image: chat?.avatar as string, body: message.message.content, icon: chat?.avatar as string});
                        if (!chat) {
                            return chats;
                        }
                        let chatsCopy = [...chats];
                        chatsCopy.splice(chats.indexOf(chat), 1);
                        return [chat, ...chatsCopy];
                    });

                    setNotifications((notifications) => {
                        let newNotifications = new Map<string, number>(notifications);
                        let currentNotifications = newNotifications.get(message.chatID);
                        if (!currentNotifications) {
                            currentNotifications = 0;
                        }

                        console.log(currentNotifications, message.chatID);
                        notifications.set(message.chatID, currentNotifications + 1);

                        return notifications;
                    });

                    return curChat;
                }

                if (message.message.sender == user?._id) {
                    return curChat;
                }
                setCurNotifications(0);
                setCurrentMessageIDX(currentMessageIDX + 1);
                return Chat.convertFromJSON({
                        "_id": curChat._id,
                        "name": curChat.name,
                        "avatar": curChat.avatar,
                        "owner": curChat.owner,
                        "users": curChat.users,
                        "messages": curChat.messages.concat([Message.convertFromJSON(message.message)])
                    }
                );
            }
            return curChat;
        });
    });


    let [currentMode, setCurrentMode] = useState<"name" | "code">("name");
    const [createChatError, setCreateChatError] = useState<string | null>(null);

    socket.on("create_chat_error", (error) => {
        setCreateChatError(error.error);
        setLoadingShareCode(false);
    });

    function toggleMode(){
        setLoadingShareCode(false);
        setShareCode(null);
        setCreateChatError(null);

        if (currentMode == "name"){
            setCurrentMode("code");
        } else {
            setCurrentMode("name");
        }
    }


    // Get current user

    function toggleSidebar(){
        if (!expanded){
            setClassName("flex-1 flex flex-col h-full blur-sm");
        } else {
            if (!memberExpanded) {
                setClassName("flex-1 flex flex-col h-full");
            }
        }

        setChatSidebarClass("");
        setExpanded(!expanded);
    }

    let [curNotifications, setCurNotifications] = useState(0);

    function loadChat(chatID: string){
        const chat = chats.find((chat) => chat?._id == chatID);
        if (!chat){
            return;
        }
        setNotifications((notifications) => {
            let newNotifications = new Map<string, number>(notifications);
            setCurNotifications(notifications.get(chatID) as number);
            newNotifications.set(chatID, 0);
            return newNotifications;
        });
        setCurrentMessageIDX(0);
        setLoadingMessages(true);
        loadMessages(chatID, 0, 50).then((data) => {
                const jsonData = JSON.parse(data);
                setCurrentMessageIDX(jsonData["newIDX"]);
                console.log(jsonData["newIDX"]);
                chat.messages = jsonData["messages"];
                setCurrentChat(chat);

                setLoadingMessages(false);
            }
        );

        getChatMembers(chatID).then((data) => {
                const jsonData = JSON.parse(data as string);
                setCurrentChatMembers(
                    jsonData.map(
                        (user: Map<string, any>) => (
                            User.convertFromJSON(user)
                        )
                    )
                );
            }
        );
    }

    function toggleCreateChatUI(){
        setLoadingShareCode(false);
        setShareCode(null);
        setCreateChatError(null);
        setCreateChatUI(!createChatUI);
    }

    function toggleMemberSidebar(){
        if (!memberExpanded){
            setClassName("flex-1 flex flex-col h-full blur-sm");
            setChatSidebarClass("blur-sm");
        } else {
            if (!expanded){
                setClassName("flex-1 flex flex-col h-full");
            }
            setChatSidebarClass("");
        }

        setMemberExpanded(!memberExpanded);
    }

    let [showProfile, setShowProfile] = useState<boolean>(false);
    let [currentProfile, setCurrentProfile] = useState<User|null>(null);

    function toggleProfile(user: User|null){
        if (showProfile){
            setCurrentProfile(null);
            setClassName("flex-1 flex flex-col h-full")
            setChatSidebarClass("");
        } else {
            setCurrentProfile(user);
            setMemberExpanded(false);
        }
        setShowProfile(!showProfile);
    }

    useEffect(() => {
        const unloadCallback = (event: Event) => {

            if (user) {
                socket.emit("user_disconnect", user._id);
            }
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, [socket, user]);

    let [alreadyOnline, setAlreadyOnline] = useState<boolean>(false);

    if (user && !alreadyOnline){
        socket.emit("user_connect", user._id);
        user.status = "online";
        for (let i = 0; i < currentChatMembers.length; i++){
            if (currentChatMembers[i] === null) {
                break;
            }
            if (currentChatMembers[i]?._id == user._id){
                // @ts-ignore
                currentChatMembers[i].status = "online";
            }
        }

        setAlreadyOnline(true);
    }


    const embedsRef = useRef({});

    const embeds = useMemo(() => {
        if (!currentChat) {
            return [];
        }
        return currentChat.messages.map((message) => {
            // Extract URLs and memoize embeds
            const regexString = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";
            const regex = new RegExp(regexString);
            const urls = regex.exec(message.content);

            if (!urls){
                return null;
            }
            return urls.map((url) => {
                // @ts-ignore
                if (!embedsRef.current[url]) {
                    // @ts-ignore
                    embedsRef.current[url] = <Embed key={url} url={url}/>;
                }
                // @ts-ignore
                return embedsRef.current[url];
            });
        });
    }, [currentChat]);


    return (
        <main className="h-screen w-screen">
            { !session && status != "loading" ? <LoginModal/> : null}
            { createChatUI ? <CreateChatUI toggleMode={toggleMode} currentMode={currentMode} error={createChatError} createChatClient={createChatClient} shareCode={shareCode} submitting={loadingShareCode} toggleCreateChatUI={toggleCreateChatUI}/> : null }
            <div className={(!session && status != "loading") || (createChatUI) ? "w-full h-full opacity-50 blur-sm" : "w-full h-full"}>
                <div className={chatSidebarClass}>
                    { expanded ? <Sidebar notifications={notifications} curChatID={currentChat?._id} chats={chats} user={user} expanded={expanded} toggleSidebar={toggleSidebar} toggleCreateChatUI={toggleCreateChatUI} loadChat={loadChat}/>: null }
                </div>
                { showProfile ? <ProfileView toggleProfile={toggleProfile} user={currentProfile} /> : null }
                <div>
                    { memberExpanded ? <MemberSidebar toggleProfile={toggleProfile} userID={user?._id} chatID={currentChat?._id} owner={currentChat?.owner} users={currentChatMembers} toggleMemberSidebar={toggleMemberSidebar}/>: null }
                </div>
                <div className="flex flex-row h-full w-full">
                    <div className={chatSidebarClass}>
                        { !expanded ? <Sidebar notifications={notifications} curChatID={currentChat?._id} chats={chats} user={user} expanded={expanded} toggleSidebar={toggleSidebar} toggleCreateChatUI={toggleCreateChatUI} loadChat={loadChat}/>: null }
                    </div>

                    <div className={className}>
                        <ChatHeader chat={currentChat} owner={currentChat?.owner == user?._id} toggleSidebar={toggleSidebar} toggleMemberSidebar={toggleMemberSidebar}/>
                        <ChatUI embeds={embeds} setLoadingMessages={setLoadingMessages} setCurrentChat={setCurrentChat} chat={currentChat} setCurrentMessageIDX={setCurrentMessageIDX} notifications={curNotifications} currentMessageIDX={currentMessageIDX} loadingMessages={loadingMessages} users={currentChatMembers}/>
                        <MessageBox sendMessage={sendMessage}/>
                    </div>
                </div>
            </div>
        </main>
    );
}




