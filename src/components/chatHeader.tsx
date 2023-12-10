"use client";
import {Bars3Icon, PencilIcon, UsersIcon} from "@heroicons/react/20/solid";

export default function ChatHeader({toggleSidebar} : {toggleSidebar: Function}){
    return (
        <div className="flex flex-row w-full dark:bg-neutral-900 p-4 items-center justify-between relative top-0 h-16 left-0 ">
            <div className="flex flex-row items-center">
                <button onClick = {() => toggleSidebar()} className="ml-2 mr-4 md:hidden flex-0 w-12 h-12 p-3.5 rounded-full dark:bg-neutral-800 dark:hover:bg-neutral-900 items-center">
                        <Bars3Icon name="menu" className="h-5 w-5 fill-neutral-300"/>
                </button>
                <h1 className="text-3xl"><strong>Coding</strong></h1>
            </div>


            <div className="flex flex-row float-left">
                <div className="mx-4 flex-0 w-12 h-12 p-3.5 rounded-full dark:bg-neutral-800 dark:hover:bg-neutral-900 items-center">
                    <PencilIcon name="pencil" className="h-5 w-5 fill-neutral-300"/>
                </div>

                <div className="flex-0 w-12 mr-2 h-12 p-3.5 rounded-full dark:bg-neutral-800 dark:hover:bg-neutral-900 items-center">
                    <UsersIcon name="users" className="h-5 w-5 fill-neutral-300"/>
                </div>
            </div>

        </div>
    )
}