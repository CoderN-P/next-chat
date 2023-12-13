"use client";
import LoginModal from "@/components/login";
import createUserServer from "@/app/actions/createUser";
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

export default function Home() {
    let [expanded, setExpanded] = useState(false);
    let [className, setClassName] = useState("flex-1 flex flex-col h-full");
    let [memberExpanded, setMemberExpanded] = useState(false);
    let [chatSidebarClass, setChatSidebarClass] = useState("");
    const [user, setUser] = useState<Map<string, any>  | null>(null);
    const [chatID, setChatID] = useState<string | null>(null);
    const [createChatUI, setCreateChatUI] = useState<boolean>(false);
    const [shareCode, setShareCode] = useState<string | null>(null);
    const[loadingShareCode, setLoadingShareCode] = useState<boolean>(false);


    // Get current user
    const {data: session, status} = useSession();

     let initialState = [];
    if (user){
        for (let i = 0; i < user["chats"].length; i++){
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
            setUser(JSON.parse(data));
            console.log(user);
        });
    }

    if (user && chats.includes(null)) {
        getChats(user["email"]).then((data: string) => {
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
        console.log(user);
        createChatAction(JSON.stringify({name: name, users: [user["email"]], avatar: user["image"]})).then((data: string) => {
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
            { expanded ? <Sidebar chats={chats} user={user} expanded={expanded} toggleSidebar={toggleSidebar} toggleCreateChatUI={toggleCreateChatUI}/>: null }
        </div>


        { memberExpanded ? <MemberSidebar toggleMemberSidebar={toggleMemberSidebar}/>: null }

        <div className="flex flex-row h-full w-full">
        <div className={chatSidebarClass}>
            { !expanded ? <Sidebar chats={chats} user={user} expanded={expanded} toggleSidebar={toggleSidebar} toggleCreateChatUI={toggleCreateChatUI} />: null }
        </div>

        <div className={className}>
            <ChatHeader toggleSidebar={toggleSidebar} toggleMemberSidebar={toggleMemberSidebar}/>
            <ChatUI chatID={chatID}/>
            <MessageBox sendMessage={sendMessage}/>
        </div>
        </div>
            </div>



    </main>
  );
}

