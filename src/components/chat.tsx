"use client";

import ChatMessage from "@/components/message";

export default function ChatUI({chatID} : {chatID: string | null}){
    let className = "flex w-full justify-items-end flex-col-reverse h-full p-4 overflow-y-scroll";
    if (!chatID){
        className = "flex items-center justify-center p-6 h-full";
    }
    return (
        <div className={className}>
            {!chatID ? <h1 className="text-4xl"><strong>Select or create a chat to start messaging!</strong></h1> : null}

        </div>
    )
}
