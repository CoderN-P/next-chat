import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function SidebarProfile({user=null, expanded = false} : {user?: Map<string, any>|null, expanded?: boolean}){
    let className = "absolute border-t dark:border-neutral-800 bottom-0 p-4 left-0 flex flex-row w-24 lg:w-64 hover:bg-neutral-300 dark:hover:bg-neutral-800 h-20 bg-neutral-200 dark:bg-neutral-900 shadow";
    let className2 = "hidden lg:block flex-1 flex flex-col h-full justify-center";

    if (expanded){
        className = "absolute bottom-0 p-4 left-0 flex flex-row w-64 hover:bg-neutral-200 dark:hover:bg-neutral-800 h-20 bg-neutral-300 dark:bg-neutral-900 shadow"
        className2 = "flex-1 flex flex-col h-full justify-center";
    }

    return (
    <div className={className}>

            <div className="ml-1.5 flex-0 w-16 h-16 rounded-l-md items-center">
                <div className="relative">
                    {!user ? <Skeleton circle={true} height={48} width={48} baseColor="#525252" highlightColor="#3f3f46" /> :
                        <><img className="rounded-full h-12 w-12" src={user["image"]} alt="Profile Picture"/><span
                            className="bottom-0 left-9 absolute  w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span></>
                    }
                    </div>
            </div>

            <div className={className2}>
                {!user ? <Skeleton baseColor="#525252" highlightColor="#3f3f46" /> :
                    <h1 className="text-lg">{user["name"]}</h1>
                }
                {!user ? <Skeleton baseColor="#525252" highlightColor="#3f3f46" /> :
                    <h2 className="text-sm text-neutral-400">{user["email"]}</h2>
                }
            </div>
        </div>
    )
}