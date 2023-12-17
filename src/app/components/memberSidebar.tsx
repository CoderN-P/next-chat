import React from "react";
import ChatMember from "@/app/components/chatMember";
import {User} from "@/types";
import AddMemberUI from "@/app/components/addMemberUI";

export default function MemberSidebar({users, toggleMemberSidebar = () => { }, owner, chatID, userID, toggleProfile} : {users: (User|null)[], toggleMemberSidebar?: Function, owner: string | undefined, chatID: string|undefined, userID: string|undefined, toggleProfile: Function}){
    const h1 = "text-2xl";
    const aside = "absolute border-l dark:border-neutral-800 top-0 right-0 z-40 w-64 h-full";
    const plusButton = "flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700";
    const closeButton = "flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700";

    const [showAddMember, setShowAddMember] = React.useState<boolean>(false);
    const [showKickMember, setShowKickMember] = React.useState<boolean>(false);

    function toggleAddMember(){
        setShowAddMember(!showAddMember);
    }
    function toggleKickMember(){
        setShowKickMember(!showKickMember);
    }
    return (
        <aside className={aside}>

            <div className="flex flex-col w-full h-full px-4 bg-white border-r dark:bg-neutral-950 dark:border-neutral-800">
                <div className="flex flex-row my-4 justify-between items-center">
                    <h1 className={h1}><strong>Members</strong></h1>
                    {userID && owner && userID === owner ?
                    <button onClick={()=>toggleAddMember()} className={plusButton}>
                        <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4v16m8-8H4"></path>
                        </svg>
                    </button> : null}
                    <button className={closeButton} onClick = {() => toggleMemberSidebar()}>
                        <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                {showAddMember ? <AddMemberUI toggleAddMember={toggleAddMember} chatID={chatID}/> : null}
                {
                    users.map(
                        (user : User | null, index) => (
                            <button key={user?._id || index} onClick={()=>toggleProfile(user)} >
                            <ChatMember showKick={(user && user?._id !== owner && userID===owner && userID) as boolean} user={user}/>
                            </button>
                        )
                    )
                }

            </div>
        </aside>
    )
}