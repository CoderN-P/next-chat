"use client";

import ChatMessage from "@/components/message";

export default function Chat({chatID} : {chatID: string | null}){
    let className = "flex w-full justify-items-end flex-col-reverse h-full p-4 overflow-y-scroll";
    if (!chatID){
        className = "flex items-center h-full p-4";
    }
    return (
        <div className={className}>
            {!chatID ? <h1 className="text-4xl">Select or create a chat to start messaging</h1> : null}

        </div>
    )
}
