import {useState} from "react";
import { Spinner } from "@material-tailwind/react";

export default function CreateChatUI({toggleCreateChatUI, submitting=false, shareCode=null, createChatClient} : {toggleCreateChatUI: Function, submitting: boolean, shareCode: string|null, createChatClient: Function}) {
    let className = "absolute z-10 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-md border dark:border-neutral-800  items-center shadow p-4 dark:bg-neutral-900 dark:hover:bg-neutral-800";
    let [currentMode, setCurrentMode] = useState<"name" | "code">("name");
    let [inputText, setInputText] = useState<string>("");
    let className2 = "p-2 rounded-md dark:bg-neutral-950 hover:bg-neutral-900 text-lg"
    let className3 = "p-2 rounded-md dark:bg-neutral-950 border dark:border-neutral-700 hover:bg-neutral-900 text-lg"
    if (currentMode == "name"){
        className2 = "p-2 rounded-md dark:bg-neutral-950 border dark:border-neutral-700 hover:bg-neutral-900 text-lg"
        className3 = "p-2 rounded-md dark:bg-neutral-950 hover:bg-neutral-900 text-lg"
    }

    function toggleMode(){
        if (currentMode == "name"){
            setCurrentMode("code");
        } else {
            setCurrentMode("name");
        }
    }
    return (
    <div className={className}>
      <div className="flex flex-row mb-2 justify-between items-center">
          <div className="flex flex-row justify-between items-center space-x-2">
            <h1 onClick={()=>toggleMode()} className={className2}><strong>Name</strong></h1>
              <h1 onClick={()=>toggleMode()} className={className3}><strong>Code</strong></h1>
          </div>
            <button onClick={() => toggleCreateChatUI()} className="flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">
                <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
      </div>
        <div className={shareCode ? "mb-2" : ""}>
        <div className=" flex w-full flex-row items-center justify-end dark:bg-neutral-950 rounded-md">
        <input onInput={(e) => setInputText((e.target as HTMLTextAreaElement).value)} type="text" className=" flex-1 w-4/5 rounded-md border-l dark:border-neutral-800 p-2 dark:bg-neutral-950 dark:hover:bg-neutral-900" placeholder={(currentMode == "name")? "Enter a name": "Enter a share code"}/>
            {submitting ? <Spinner/> : <><button onClick={() => createChatClient(inputText, currentMode)} disabled={!inputText}><svg className="w-6 h-6 mx-2 text-green-400 dark:hover:text-green-400 dark:text-green-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
               <path d="M5 13l4 4L19 7"></path></svg></button></>
            }
        </div>
    </div>

        <p className={shareCode ? "" : "hidden"}>Share Code  <code className="dark:bg-neutral-950 p-2 rounded-md mx-2">{shareCode}</code> </p>
    </div>
  )
}