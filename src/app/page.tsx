"use client";
import LoginModal from "@/components/login";
import createUserServer from "@/app/actions/createUser";
import User from "@/types/User";
import '@/app/globals.css';
import Sidebar from "@/components/sidebar";
import MessageBox from "@/components/messageBox";
import ChatHeader from "@/components/chatHeader";
import {useState} from "react";

export default function Home() {
    let [expanded, setExpanded] = useState(false);
    let [className, setClassName] = useState("flex-1 flex flex-col h-full");

    function toggleSidebar(){
        if (!expanded){
             setClassName("flex-1 flex flex-col h-full blur-sm");
        } else {
            setClassName("flex-1 flex flex-col h-full");
        }


        setExpanded(!expanded);
    }

    //createUserServer(new User({username: "test", email: "test@test.com", password: "test"})).then(r => console.log(r));
  return (
    <main className="h-screen w-screen">
        { expanded ? <Sidebar expanded={expanded} toggleSidebar={toggleSidebar}/>: null }
        <div className="flex flex-row h-full w-full">
            { !expanded ? <Sidebar expanded={expanded} toggleSidebar={toggleSidebar}/>: null }

        <div className={className}>
            <ChatHeader toggleSidebar={toggleSidebar}/>
            <LoginModal />
            <MessageBox/>
        </div>
        </div>


    </main>
  );
}

