"use client";

import ChatMessage from "@/app/components/message";
import {Chat, User, Message, embed} from "@/types";

export default function ChatUI({chat=null, users, loadingMessages=false, notifications}: {chat?: Chat | null, users: (User|null)[], loadingMessages: boolean, notifications: number|undefined}){
    const messages = []

    if (loadingMessages){
        for (let i = 0; i < 10; i++) {
            messages.push(null);
        }
    }


    let className = "flex w-full justify-items-end no-scrollbar flex-col-reverse h-full p-4 overflow-y-scroll";
    if (!chat){
        className = "flex items-center justify-center p-6 h-full";
    }
    return (
        <div id="messages" className={className}>
            {!chat ? <h1 className="text-4xl"><strong>Select or create a chat to start messaging!</strong></h1> :
                <>{ loadingMessages ?
                    messages.map(
                            (message, index) => (
                                <ChatMessage key={index}/>
                            )
                        )
                     : [...chat.messages].reverse().map(
                            (message: Message | null, index) => (
                                <ChatMessage
                                    group={
                                    (index < chat.messages.length-1 && chat.messages[chat.messages.length-index-2].sender === chat.messages[chat.messages.length-index-1].sender)
                                        ? group(chat.messages[chat.messages.length-index-2].sendDate, chat.messages[chat.messages.length-index-1].sendDate)
                                        : false} newMessage={index < (notifications? notifications : 0) } key={index} message={message} author={users.find((user) => user?._id === message?.sender)}/>
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