import {User} from "@/types";

export default function ProfileView({user, toggleProfile}:{user: User|null, toggleProfile: Function}){
    const statusColor = user?.status === "online" ? "bg-green-400" : "bg-red-400";
    const statusClass = "bottom-0 z-10 left-9 absolute  w-4 h-4 border-2 border-white dark:border-gray-800 rounded-full " + statusColor;
    return (
        <div className="absolute flex flex-col z-50 w-72 h-72 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-md border dark:border-neutral-800  items-center shadow ">
            <div className="absolute top-0 right-0 p-2 ">
                <button className="flex flex-row justify-center items-center" onClick={()=>toggleProfile(null)}>
                    <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-300" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div className="dark:hover:bg-neutral-900 flex w-full flex-row mb-2 p-2 items-center border-b dark:border-neutral-800 rounded-t-md dark:bg-neutral-950">
            <div className=" w-16 h-16 p-2 rounded-l-md items-center">
                <div className="relative">
                    { user ?
                        <img className="rounded-full h-12 w-12 " src={user.image} alt="Profile Picture"/>
                        : null
                    }
                    <span className={statusClass}></span>
                </div>
            </div>
            <div className="flex-1 truncate flex flex-col mr-2">
                <h1 className="text-md">{user? user.name : null}</h1>
                <h2 className="text-xs text-neutral-400">{user? (user.email) : null}
                </h2>
            </div>
        </div>
        </div>
    )
}