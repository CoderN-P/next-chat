'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {Chat} from "@/types";

export default function SidebarChat({ chat=null, active= false , expanded= false, notifications} : {chat: Chat | null, active: boolean, expanded?: boolean, notifications: number|undefined}){
    let className = "relative border p-2 dark:border-neutral-800 mb-2 flex flex-row w-full hover:bg-neutral-200 dark:hover:bg-neutral-800 h-16 bg-neutral-300 dark:bg-neutral-900 rounded-xl shadow";
    let className2 = "hidden ml-4 text-left lg:block flex-1 flex justify-center  h-full";

    if (expanded){
        className2 = " flex-1 ml-2 text-left flex justify-center h-full";
    }
    if (active) {
        className = "relative mb-2 p-2 dark:border-neutral-800 border flex flex-row w-full hover:bg-neutral-300 dark:hover:bg-neutral-900 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-xl shadow";
    }


    return (
        <div className={className}>
            {notifications && notifications > 0 ? <span className="absolute bottom-12 text-black py-0.5 px-[7px] z-10 font-bold text-xs left-52 rounded-full h-5 w-auto bg-red-500">{notifications}</span> : null }
            <div className="flex-0 w-12 h-12 rounded-l-md items-center">
                {!chat ? <Skeleton circle={true} height={48} width={48} className="animate-pulse" baseColor="#404040" highlightColor="#404040" /> :
                    <img className="rounded-full h-12 w-12" src={chat.avatar} alt="Profile Picture"/>
                }
            </div>

            <div className={className2}>
                <h1 className="text-xl mt-2">{!chat ? <Skeleton className="animate-pulse" baseColor="#404040" highlightColor="#404040" /> : chat.name}</h1>
            </div>
        </div>
    )
}