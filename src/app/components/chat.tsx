"use client";

import ChatMessage from "@/app/components/message";
import {useEffect, useRef, useState} from "react";
import {Chat, User, Message, embed} from "@/types";
import InfiniteScroll from 'react-infinite-scroll-component';
import loadMessages from "@/app/actions/loadMessages.ts";

export default function ChatUI({chat=null, users, embeds, loadingMessages=false, notifications, setLoadingMessages, currentMessageIDX, setCurrentMessageIDX, setCurrentChat, totalMessages}: {chat?: Chat | null, users: (User|null)[], embeds: (any[]|null)[], loadingMessages: boolean, notifications: number|undefined, setLoadingMessages: Function, currentMessageIDX: number, setCurrentMessageIDX: Function, setCurrentChat: Function, totalMessages: number}){
    const messages = []

    const divRef = useRef<HTMLDivElement>(null);
    console.log(totalMessages, currentMessageIDX, "total messages")
    function fetchMessages(){
        if (loadingMessages){
            return;
        }
        setLoadingMessages(true);
        if (!chat){
            return;
        }
        console.log(currentMessageIDX, "fetching messages")
        loadMessages(chat._id, currentMessageIDX, 50).then((data) => {
            setLoadingMessages(false);
            const parsedData = JSON.parse(data);
            if (parsedData.messages.length === 0){
                return;
            }
            const newMessages = parsedData.messages;
            const newIDX = parsedData.newIDX;
            const newChat = chat;
            newChat.messages = newMessages.concat(chat.messages);
            setCurrentChat(newChat);
            setCurrentMessageIDX(newIDX);
        });
    }

    if (loadingMessages){
        for (let i = 0; i < 10; i++) {
            messages.push(null);
        }
    }


    let className = "flex w-full justify-items-end flex-col-reverse no-scrollbar h-full p-4 overflow-auto";
    if (!chat){
        className = "flex items-center justify-center p-6 h-full";
    }
    return (
        <div id="messages" ref={divRef} className={className}>
            {!chat ? <h1 className="text-4xl"><strong>Select or create a chat to start messaging!</strong></h1> :
                        <InfiniteScroll
                            next={fetchMessages}
                            inverse={true} //
                            hasMore={currentMessageIDX < totalMessages}
                            className="flex flex-col-reverse w-full"
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                            dataLength={chat.messages.length}
                            loader={
                                    <ChatMessage embeds={[]} newMessage={false} curKey={0}/>
                            }
                        >
                            {[...chat.messages].reverse().map(
                                    (message: Message | null, index) => (
                                        <ChatMessage
                                            group={
                                                (index < chat.messages.length-1 && chat.messages[chat.messages.length-index-2].sender === chat.messages[chat.messages.length-index-1].sender)
                                                    ? group(chat.messages[chat.messages.length-index-2].sendDate, chat.messages[chat.messages.length-index-1].sendDate)
                                                    : false} newMessage={index < (notifications? notifications : 0) } curKey={index} key={index} embeds={embeds[chat.messages.length-index-1] || []} message={message} author={users.find((user) => user?._id === message?.sender)}/>
                                    )
                                )
                            }
                        </InfiniteScroll>
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