"use client";
import { PaperAirplaneIcon} from "@heroicons/react/20/solid";

export default function MessageBox(){
    return (
        <div className="flex flex-row rounded-md bg-neutral-100 relative top-0 h-16 left-0 dark:bg-neutral-900 dark:hover:bg-neutral-800 m-4">
            <input className="rounded-l-md flex-1 bg-transparent shadow p-2 px-6 h-16 items-center" type="text" placeholder="Message @NP"/>
            <div className="ml-2 flex-0 w-20 h-16 p-2 rounded-r-md 0 items-center">
                <PaperAirplaneIcon name="paper-airplane" className="h-10 mt-1 w-10 dark:fill-neutral-300 dark:hover:fill-neutral-100"/>
            </div>
        </div>
    )

}