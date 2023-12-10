'use client';

export default function SidebarChat({ active= false , expanded= false}) {
    let className = "mb-2 flex flex-row w-full hover:bg-neutral-200 dark:hover:bg-neutral-800 h-16 bg-neutral-300 dark:bg-neutral-900 rounded-md shadow";
    let className2 = "mt-2 hidden lg:block ml-2 flex-1 flex flex-col h-full justify-center";

    if (expanded){
        className2 = "ml-2 flex-1 flex flex-col h-full justify-center";
    }
    if (active) {
        className = "mb-2 flex flex-row w-full hover:bg-neutral-300 dark:hover:bg-neutral-800 h-16 bg-neutral-200 dark:bg-neutral-700 rounded-md shadow";
    }


    return (
        <div className={className}>

            <div className="flex-0 w-16 h-16 p-2 rounded-l-md items-center">
                <img className="rounded-full h-12 w-12" src="https://avatars.githubusercontent.com/u/76001641?v=4" alt="Profile Picture"/>
            </div>

            <div className={className2}>
                <h1 className="text-lg">Coding</h1>
                <h2 className="text-sm text-neutral-400">You, NP</h2>
            </div>
        </div>
    )
}