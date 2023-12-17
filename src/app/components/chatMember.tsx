import {User} from '@/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ChatMember({user=null}:{user: User|null}){
    return (
        <div className="flex flex-row mb-2 rounded-md border dark:border-neutral-800 dark:bg-neutral-900 items-center dark:hover:bg-neutral-800">

            <div className=" w-16 h-16 p-2 mr-1 rounded-l-md items-center">
                <div className="relative">
                    { user ?
                        <img className="rounded-full h-12 w-12 " src={user.image} alt="Profile Picture"/>
                        : <Skeleton className="animate-pulse" circle={true} height={48} width={48} baseColor="#404040" highlightColor="#404040" />
                    }
                    <span className="bottom-0 z-10 left-9 absolute  w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
            </div>
            <div className="flex-1 truncate flex flex-col mr-2">
                <h1 className="text-md">{user? user.name : <Skeleton className="animate-pulse" baseColor="#404040" highlightColor="#404040"/>}</h1>
                <h2 className="text-xs text-neutral-400">{user? (user.customStatus ? user.customStatus : user.email) : <Skeleton className="animate-pulse" baseColor="#404040" highlightColor="#404040"/>}
                </h2>
            </div>

        </div>
    )
}