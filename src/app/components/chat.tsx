"use client";

import ChatMessage from "@/app/components/message";
import {useEffect, useRef, useState} from "react";
import {Chat, User, Message, embed} from "@/types";
import loadMessages from "@/app/actions/loadMessages.ts";

export default function ChatUI({chat=null, users, embeds, loadingMessages=false, notifications, setLoadingMessages, currentMessageIDX, setCurrentMessageIDX, setCurrentChat}: {chat?: Chat | null, users: (User|null)[], embeds: (any[]|null)[], loadingMessages: boolean, notifications: number|undefined, setLoadingMessages: Function, currentMessageIDX: number, setCurrentMessageIDX: Function, setCurrentChat: Function}){
    const messages = []
    const [oldHeight, setOldHeight] = useState<number | null>(null);
    const [oldMessageID, setOldMessageID] = useState<string | null>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!divRef.current) return;
            if (!chat) return;
            if (loadingMessages) return;
            const divElement = divRef.current;
            if (divElement.scrollHeight + divElement.scrollTop - divElement.clientHeight < 1) {
                setLoadingMessages(true);

                loadMessages(chat._id, currentMessageIDX, 50).then((data) => {
                    const res = JSON.parse(data);

                    setCurrentMessageIDX(res["newIDX"]);
                    const newMessages = res["messages"];

                    setCurrentChat({
                        ...chat,
                        messages: [...newMessages, ...chat.messages]
                    });
                    setLoadingMessages(false);
                    setOldHeight(divElement.scrollHeight);
                    setOldMessageID(chat.messages[0]._id);
                });
                console.log('Scrolled to the top');
                // You can add your logic here
            }
        };

        const divElement = divRef.current;
        if (!divElement) return;
        divElement.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            divElement.removeEventListener('scroll', handleScroll);
        };
    }, [chat, currentMessageIDX, divRef, loadingMessages, setCurrentChat, setCurrentMessageIDX, setLoadingMessages]);

    if (loadingMessages){
        for (let i = 0; i < 10; i++) {
            messages.push(null);
        }
    }


    useEffect(() => {
        if (divRef.current && oldHeight && oldMessageID){
            if (divRef.current.scrollHeight - oldHeight <= 0) return;
            document.getElementById(oldMessageID)?.scrollIntoView()
        }
    }, [divRef.current?.scrollHeight, oldHeight, oldMessageID]);


    let className = "flex w-full justify-items-end no-scrollbar flex-col-reverse h-full p-4 overflow-y-scroll";
    if (!chat){
        className = "flex items-center justify-center p-6 h-full";
    }
    return (
        <div id="messages" ref={divRef} className={className}>
            {!chat ? <h1 className="text-4xl"><strong>Select or create a chat to start messaging!</strong></h1> :

                <>
                    { loadingMessages ?
                    messages.map(
                            (message, index) => (
                                <ChatMessage embeds={[]} newMessage={false} curKey={index} key={index}/>
                            )
                        )
                     : [...chat.messages].reverse().map(
                            (message: Message | null, index) => (
                                <ChatMessage
                                    group={
                                    (index < chat.messages.length-1 && chat.messages[chat.messages.length-index-2].sender === chat.messages[chat.messages.length-index-1].sender)
                                        ? group(chat.messages[chat.messages.length-index-2].sendDate, chat.messages[chat.messages.length-index-1].sendDate)
                                        : false} newMessage={index < (notifications? notifications : 0) } curKey={index} key={index} embeds={embeds[chat.messages.length-index-1] || []} message={message} author={users.find((user) => user?._id === message?.sender)}/>
                            )
                    )
                }</>

            }




        </div>
    )
}


function group(d1?: Date|null|undefined, d2?: Date|null|undefined){
    if (!d1 || !d2){
        return false;
    }

    const diffTime = Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    const diffMin = Math.ceil(diffTime / (1000 * 60));
    return diffMin < 10;
}