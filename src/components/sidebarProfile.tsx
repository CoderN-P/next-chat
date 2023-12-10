export default function SidebarProfile({expanded = false}){
    let className = "absolute bottom-0 p-4 left-0 flex flex-row w-24 lg:w-64 hover:bg-neutral-300 dark:hover:bg-neutral-800 h-20 bg-neutral-200 dark:bg-neutral-900 rounded-md shadow";
    let className2 = "hidden lg:block flex-1 flex flex-col h-full justify-center";

    if (expanded){
        className = "absolute bottom-0 p-4 left-0 flex flex-row w-64 hover:bg-neutral-200 dark:hover:bg-neutral-700 h-20 bg-neutral-300 dark:bg-neutral-800 shadow"
        className2 = "flex-1 flex flex-col h-full justify-center";
    }

    return (
    <div className={className}>

            <div className="ml-1.5 flex-0 w-16 h-16 rounded-l-md items-center">
                <img className="rounded-full h-12 w-12" src="https://avatars.githubusercontent.com/u/76001641?v=4" alt="Profile Picture"/>
            </div>

            <div className={className2}>
                <h1 className="text-lg">Bob</h1>
                <div className="flex flex-row">
                    <div className="rounded-full h-2 w-2 bg-green-500 mt-1.5"></div>
                    <h2 className="ml-2 text-sm text-neutral-400 ">Online</h2>
                </div>
            </div>
        </div>
    )
}