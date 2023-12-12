"use client";
import  Message from "@/types/Message";

export default function ChatMessage({message, author} : {message: Message, author: Map<string, any>}){
    return (
        <div className="flex flex-row w-full mb-2 rounded-md items-center dark:hover:bg-neutral-900">
            <div className="flex-0 w-16 h-16 p-2 rounded-l-md items-center">
                <img className="rounded-full h-12 w-12" src={ author.get("image")} alt="Profile Picture"/>
            </div>
            <div className="flex flex-col">
                <h1 className="text-md">{ author.get("name") } <span className="text-xs dark:text-neutral-300">Today at 3:00 PM</span></h1>
                <h2 className="text-md text-neutral-400">{ message.content }</h2>
            </div>
        </div>
    )
}