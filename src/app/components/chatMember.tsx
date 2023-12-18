import {User} from '@/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ChatMember({user=null, showKick}:{user: User|null, showKick: boolean|null}){
    const statusColor = user?.status === "online" ? "bg-green-400" : "bg-red-400";
    const statusClass = "bottom-0 z-10 left-9 absolute  w-4 h-4 border-2 border-white dark:border-gray-800 rounded-full " + statusColor;
    return (
        <div className="flex relative group flex-row mb-2 rounded-md border dark:border-neutral-800 dark:bg-neutral-900 items-center dark:hover:bg-neutral-800">
            {showKick ?
                <>
            <div className="absolute top-0 p-2 right-0 text-red-600  hidden dark:hover:text-red-500 group-hover:block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            </>
                    : null}
            <div className=" w-16 h-16 p-2 mr-1 rounded-l-md items-center">
                <div className="relative">
                    { user ?
                        <img className="rounded-full h-12 w-12 " src={user.image} alt="Profile Picture"/>
                        : <Skeleton className="animate-pulse" circle={true} height={48} width={48} baseColor="#404040" highlightColor="#404040" />
                    }
                    <span className={statusClass}></span>
                </div>
            </div>
            <div className="flex-1 truncate flex flex-col items-baseline mr-2">
                <h1 className="text-md">{user? user.name : <Skeleton className="animate-pulse" baseColor="#404040" highlightColor="#404040"/>}</h1>
                <h2 className="text-xs text-neutral-400">{user? (user.customStatus ? user.customStatus : user.email) : <Skeleton className="animate-pulse" baseColor="#404040" highlightColor="#404040"/>}
                </h2>
            </div>

        </div>
    )
}