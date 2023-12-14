"use client";

import ChatMessage from "@/components/message";
import Chat from "@/types/Chat";
import User from "@/types/User";
import Message from "@/types/Message";

export default function ChatUI({chat=null, users, loadingMessages=false}: {chat?: Chat | null, users: (User|null)[], loadingMessages: boolean}){
    const messages = []

    if (loadingMessages){
        for (let i = 0; i < 10; i++) {
            const today = new Date();
            const yesterday = new Date(today);
            messages.push(null);
        }
    }

    let className = "flex w-full justify-items-end flex-col-reverse h-full p-4 overflow-y-scroll";
    if (!chat){
        className = "flex items-center justify-center p-6 h-full";
    }
    return (
        <div className={className}>
            {!chat ? <h1 className="text-4xl"><strong>Select or create a chat to start messaging!</strong></h1> :
                <>{ loadingMessages ?
                    messages.map(
                            (message, index) => (
                                <ChatMessage key={index}/>
                            )
                        )
                     : chat.messages.map(
                            (message: Message | null, index) => (
                                <ChatMessage key={index} message={message} author={users.find((user) => user?._id === message?.sender)}/>
                            )
                    )
                }</>
            }



        </div>
    )
}
