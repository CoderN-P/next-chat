'use client';
import React from 'react';
import SidebarChat from './sidebarChat';
import SidebarProfile from './sidebarProfile';

export default function Sidebar({expanded= false, toggleSidebar=()=>{}}){
    let h1 = "text-2xl hidden lg:block";
    let aside = "flex-0 hidden md:block top-0 left-0 z-40 w-24 lg:w-64 h-full transition-transform -translate-x-full sm:translate-x-0";
    let plusButton = "flex flex-row justify-center ml-2 lg:ml-0 mb-2 lg:mb-0  items-center w-12 h-12 lg:w-10 lg:h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700";

    if (expanded){
        h1 = "text-2xl";
        aside = "absolute top-0 left-0 z-40 w-64 h-full";
        plusButton = "flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700";
    }

    let closeButton = "hidden";

    if (expanded){
        closeButton = "flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700";
    }

    return (
        <aside className={aside}>
            <div className="flex flex-col w-full h-full px-4 bg-white border-r dark:bg-neutral-950 dark:border-neutral-800">
                <div className="flex flex-row my-4 justify-between items-center">
                    <h1 className={h1}><strong>Your Chats</strong></h1>
                    <button className={plusButton}>
                        <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button>
                    <button className={closeButton} onClick = {() => toggleSidebar()}>
                        <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <SidebarChat active={true} expanded={expanded}/>
                <SidebarChat expanded={expanded}/>

            </div>
            <SidebarProfile expanded={expanded}/>
        </aside>
    )
}