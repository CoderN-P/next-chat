import SidebarChat from "@/components/sidebarChat";
import SidebarProfile from "@/components/sidebarProfile";
import React from "react";
import ChatMember from "@/components/chatMember";

export default function MemberSidebar({toggleMemberSidebar = () => { }}){
    const h1 = "text-2xl";
    const aside = "absolute top-0 right-0 z-40 w-64 h-full";
    const plusButton = "flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700";
    const closeButton = "flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700";

    return (
        <aside className={aside}>
            <div className="flex flex-col w-full h-full px-4 bg-white border-r dark:bg-neutral-950 dark:border-neutral-800">
                <div className="flex flex-row my-4 justify-between items-center">
                    <h1 className={h1}><strong>Members</strong></h1>
                    <button className={plusButton}>
                        <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button>
                    <button className={closeButton} onClick = {() => toggleMemberSidebar()}>
                        <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <ChatMember/>

            </div>
        </aside>
    )
}