"use client";
import  Message from "@/db/types/Message";
import User from "@/db/types/User";
import getTimeString from "@/app/utils/getTimeString";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ChatMessage({message=null, author=null, group=false} : {message?: Message|null, author?: User|null, group?: boolean}){
    if (group){
        return (
            <div className="flex flex-row group px-1 w-full rounded-md items-center dark:hover:bg-neutral-900">
                <div className="float-left mr-1 text-xs text-neutral-500 w-14">
                    <div className="hidden group-hover:block">
                        {message? getTimeString(message.sendDate.toString(), false) : null}
                    </div>
                </div>
                <div className="flex-1 text-lg text-neutral-400">
                    { !message ? <Skeleton className="animate-pulse" baseColor="#404040" highlightColor="#404040"/> : message.content}
                </div>
            </div>
        )
    }
    let className = "mt-3 last:mt-0 flex flex-row w-full rounded-md dark:hover:bg-neutral-900"

    return (
        <div className={className}>

            <div className="flex-0 w-16 h-16 p-2 rounded-l-md">
                    {
                        author?
                            <img className="rounded-full h-12 w-12" src={author.image} alt="Profile Picture"/> :
                            <Skeleton circle={true} height={48} width={48} className="animate-pulse" baseColor="#404040" highlightColor="#404040"/>
                    }
            </div>
            <div className={author? "flex flex-col mt-2" : "flex flex-col w-1/3 mt-2"}>
                <h1 className="text-lg">{ !author ? <Skeleton className="animate-pulse" baseColor="#404040" highlightColor="#404040"/> : author.name} <span className="text-xs dark:text-neutral-300 m-2">{message? getTimeString(message.sendDate.toString()) : null}</span></h1>
                <h2 className="text-lg text-neutral-400">{ !message ? <Skeleton className="animate-pulse" baseColor="#404040" highlightColor="#404040"/> : message.content}</h2>
            </div>
        </div>
    )
}