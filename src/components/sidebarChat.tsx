'use client';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Chat from "@/types/Chat";

export default function SidebarChat({ chat=null, active= false , expanded= false} : {chat: Chat | null, active?: boolean, expanded?: boolean}){
    let className = "border p-2 dark:border-neutral-800 mb-2 flex flex-row w-full hover:bg-neutral-200 dark:hover:bg-neutral-800 h-16 bg-neutral-300 dark:bg-neutral-900 rounded-md shadow";
    let className2 = "hidden lg:block ml-2 flex-1 flex flex-col h-full justify-center";

    if (expanded){
        className2 = " flex-1 flex flex-col h-full justify-center";
    }
    if (active) {
        className = "mb-2 p-2 dark:border-neutral-800 border flex flex-row w-full hover:bg-neutral-300 dark:hover:bg-neutral-900 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-md shadow";
    }


    return (
        <div className={className}>

            <div className="flex-0 w-16 h-16 rounded-l-md items-center">
                {!chat ? <Skeleton circle={true} height={48} width={48} baseColor="#525252" highlightColor="#3f3f46" /> :
                    <img className="rounded-full h-12 w-12" src={chat.avatar} alt="Profile Picture"/>
                }
            </div>

            <div className={className2}>
                <h1 className="text-lg">{!chat ? <Skeleton baseColor="#525252" highlightColor="#3f3f46" /> : chat.name}</h1>
                <h2 className="text-sm text-neutral-400">{!chat ? <Skeleton baseColor="#525252" highlightColor="#3f3f46" /> : chat.name} </h2>
            </div>
        </div>
    )
}