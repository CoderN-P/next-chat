"use client";
import  Message from "@/types/Message";
import User from "@/types/User";
import getTimeString from "@/utils/getTimeString";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ChatMessage({message=null, author=null} : {message?: Message|null, author?: User|null}){
    return (
        <div className="flex flex-row w-full mb-2 rounded-md items-center dark:hover:bg-neutral-900">
            <div className="flex-0 w-16 h-16 p-2 rounded-l-md items-center">
                {author?
                    <img className="rounded-full h-12 w-12" src={ author.image } alt="Profile Picture"/> :
                    <Skeleton circle={true} height={48} width={48} baseColor="#404040" highlightColor="#27272a" />
                }
            </div>
            <div className={author? "flex flex-col" : "flex flex-col w-1/3"}>
                <h1 className="text-md">{ !author ? <Skeleton baseColor="#404040" highlightColor="#27272a"/> : author.name} <span className="text-xs dark:text-neutral-300">{message? getTimeString(message.sendDate.toString()) : null}</span></h1>
                <h2 className="text-md text-neutral-400">{ !message ? <Skeleton baseColor="#404040" highlightColor="#27272a"/> : message.content}</h2>
            </div>
        </div>
    )
}