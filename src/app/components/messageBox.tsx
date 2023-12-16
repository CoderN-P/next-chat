"use client";
import { PaperAirplaneIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";

export default function MessageBox({sendMessage, chatName=null} : {sendMessage: Function, chatName?: string | null}){
    const [input, setInput] = useState("");

    function clearInput(){
        setInput("");
        const messageBox: HTMLTextAreaElement | null = document.getElementById("messageBox") as HTMLTextAreaElement;
        if (messageBox) messageBox.value = "";
    }

    function handleClick(){
        sendMessage(input);
        clearInput();
    }

    useEffect(() => {
            let fired = false;
            function handleKeydown(event: KeyboardEvent) {
                if (event.key === 'Enter' && input && !fired) {
                    fired = true;
                    sendMessage(input);
                    clearInput();
                }
            }

            window.addEventListener('keydown', handleKeydown);
            window.addEventListener('keyup', (e) => {
                fired = false;
            });
            return () => {
                window.removeEventListener('keydown', handleKeydown);
            };
        }, [input, sendMessage]

    )
    return (
        <div className="flex flex-row rounded-md bg-neutral-100 relative top-0 h-16 left-0 dark:bg-neutral-900 dark:hover:bg-neutral-800 m-4">
            <input id="messageBox" onInput={e => setInput((e.target as HTMLTextAreaElement).value)} className="rounded-l-md flex-1 bg-transparent shadow p-2 px-6 h-16 items-center" type="text" placeholder={chatName? "Send a message in " + chatName : "Send a message"}/>
            <div className="ml-2 flex-0 w-20 h-16 p-2 rounded-r-md 0 justify-center flex items-center">
                <button disabled={!input}>
                    <PaperAirplaneIcon  onClick={() => handleClick()} name="paper-airplane" className="h-10 w-10 dark:fill-neutral-300 dark:hover:fill-neutral-100"/>
                </button>
            </div>
        </div>
    )

}
