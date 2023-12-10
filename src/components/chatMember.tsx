export default function ChatMember(){
    return (
        <div className="flex flex-row rounded-md dark:bg-neutral-900 dark:hover:bg-neutral-800">

            <div className="flex-0 w-16 h-16 p-2 rounded-l-md items-center">
                <div className="relative">
                    <img className="rounded-full h-12 w-12" src="https://avatars.githubusercontent.com/u/76001641?v=4" alt="Profile Picture"/>
                    <span className="bottom-0 left-9 absolute  w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
            </div>

            <div className="flex flex-col mt-2">
                <h1 className="text-lg">NP</h1>
                <h2 className="text-sm text-neutral-400">hi</h2>
            </div>
        </div>
    )
}