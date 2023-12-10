"use client";

import ChatMessage from "@/components/message";

export default function Chat(){
    return (
        <div className="flex w-full justify-items-end flex-col-reverse h-full p-4 overflow-y-scroll">
            <ChatMessage/>
            <ChatMessage message={"bruh"}/>
        </div>
    )
}
