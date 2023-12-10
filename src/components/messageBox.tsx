"use client";
import { PaperAirplaneIcon} from "@heroicons/react/20/solid";

export default function MessageBox(){
    return (
        <div className="flex flex-row rounded-md relative top-0 h-16 left-0 m-4">
            <input className="rounded-l-md flex-1 dark:bg-neutral-900 dark:hover-bg-neutral-800 bg-neutral-100 shadow p-2 px-6 h-16 items-center" type="text" placeholder="Message @NP"/>
            <div className="flex-0 w-20 h-16 p-2 rounded-r-md dark:bg-neutral-800 dark:hover:bg-neutral-900 items-center">
                <PaperAirplaneIcon name="paper-airplane" className="h-10 w-10"/>
            </div>
        </div>
    )

}