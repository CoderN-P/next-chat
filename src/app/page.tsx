"use client";
import LoginModal from "@/components/login";
import '@/app/globals.css';
import Sidebar from "@/components/sidebar";
import MessageBox from "@/components/messageBox";
import ChatHeader from "@/components/chatHeader";
import {useState} from "react";
import MemberSidebar from "@/components/memberSidebar";
import ChatUI from "@/components/chat";
import Chat from "@/types/Chat";
import {useSession} from "next-auth/react";
import getUser from "@/app/actions/getUser";
import CreateChatUI from "@/components/createChatUI";
import createChatAction from "@/app/actions/createChat";
import getChats from "@/app/actions/getChats";
import User from "@/types/User";
import loadMessages from "@/app/actions/loadMessages";
import getChatMembers from "@/app/actions/getChatMembers";

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

    if (session && session.user && !user){
        getUser("", session.user.email).then((data: string | null) => {
            if (data == null) {
                return;
            }
            setUser(User.convertFromJSON(JSON.parse(data)));
        });
    }

    if (user && chats.includes(null)) {
        getChats(user._id).then((data: string) => {
            data = JSON.parse(data);
            let newData = [];
            for (let i = 0; i < data.length; i++){
                newData[i] = Chat.convertFromJSON(data[i]);
            }
            setChats(newData);
        });
    }

    function createChatClient(name: string){
        setLoadingShareCode(true);
        if (!user){
            return;
        }
        createChatAction(JSON.stringify({name: name, users: [user._id], avatar: user["image"]})).then((data: string) => {
            setLoadingShareCode(false);
            data = JSON.parse(data);
            const newChat = Chat.convertFromJSON(data);
            setShareCode(newChat._id);
            const newChats = [newChat, ...chats];
            setChats(newChats);

        });
    }
    function sendMessage(message: string){
        console.log(message);
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

    function loadChat(chatID: string){
        const chat = chats.find((chat) => chat?._id == chatID);
        if (!chat){
            return;
        }
        setLoadingMessages(true);
        loadMessages(chatID, currentMessageIDX, 50).then((data) => {
                const jsonData = JSON.parse(data);
                setCurrentMessageIDX(jsonData["newIDX"]);
                chat.messages = jsonData["messages"];
                console.log(chat.messages);
                setCurrentChat(chat);
                setLoadingMessages(false);
            }
        );
        getChatMembers(chatID).then((data: string) => {
            const jsonData = JSON.parse(data);
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

    //createUserServer(new User({username: "test", email: "test@test.com", password: "test"})).then(r => console.log(r));
  return (
    <main className="h-screen w-screen">
        { !session && status != "loading" ? <LoginModal/> : null}
        { createChatUI ? <CreateChatUI createChatClient={createChatClient} shareCode={shareCode} submitting={loadingShareCode} toggleCreateChatUI={toggleCreateChatUI}/> : null }
        <div className={(!session && status != "loading") || (createChatUI) ? "w-full h-full opacity-50 blur-sm" : "w-full h-full"}>
        <div className={chatSidebarClass}>
            { expanded ? <Sidebar curChatID={currentChat?._id} chats={chats} user={user} expanded={expanded} toggleSidebar={toggleSidebar} toggleCreateChatUI={toggleCreateChatUI} loadChat={loadChat}/>: null }
        </div>


        { memberExpanded ? <MemberSidebar users={currentChatMembers} toggleMemberSidebar={toggleMemberSidebar}/>: null }

        <div className="flex flex-row h-full w-full">
        <div className={chatSidebarClass}>
            { !expanded ? <Sidebar curChatID={currentChat?._id} chats={chats} user={user} expanded={expanded} toggleSidebar={toggleSidebar} toggleCreateChatUI={toggleCreateChatUI} loadChat={loadChat}/>: null }
        </div>

        <div className={className}>
            <ChatHeader chat={currentChat} toggleSidebar={toggleSidebar} toggleMemberSidebar={toggleMemberSidebar}/>
            <ChatUI chat={currentChat} loadingMessages={loadingMessages} users={currentChatMembers}/>
            <MessageBox sendMessage={sendMessage}/>
        </div>
        </div>
            </div>



    </main>
  );
}

