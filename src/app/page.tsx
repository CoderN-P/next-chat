"use client";
import LoginModal from "@/components/login";
import createUserServer from "@/app/actions/createUser";
import User from "@/types/User";
import '@/app/globals.css';
import Sidebar from "@/components/sidebar";
import MessageBox from "@/components/messageBox";
import ChatHeader from "@/components/chatHeader";
import {useState} from "react";
import MemberSidebar from "@/components/memberSidebar";
import Chat from "@/components/chat";

export default function Home() {
    let [expanded, setExpanded] = useState(false);
    let [className, setClassName] = useState("flex-1 flex flex-col h-full");
    let [memberExpanded, setMemberExpanded] = useState(false);
    let [chatSidebarClass, setChatSidebarClass] = useState("");

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
        <div className={chatSidebarClass}>
            { expanded ? <Sidebar expanded={expanded} toggleSidebar={toggleSidebar}/>: null }
        </div>

        { memberExpanded ? <MemberSidebar toggleMemberSidebar={toggleMemberSidebar}/>: null }

        <div className="flex flex-row h-full w-full">
        <div className={chatSidebarClass}>
            { !expanded ? <Sidebar expanded={expanded} toggleSidebar={toggleSidebar}/>: null }
        </div>

        <div className={className}>
            <ChatHeader toggleSidebar={toggleSidebar} toggleMemberSidebar={toggleMemberSidebar}/>
            <Chat/>

            <MessageBox/>
        </div>
        </div>


    </main>
  );
}

