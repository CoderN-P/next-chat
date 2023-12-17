export default function AddMemberUI({ toggleAddMember, chatID } : {toggleAddMember: Function, chatID: string|undefined}) {
    return (
        <div className="w-full rounded-md border mb-2 dark:border-neutral-800  items-center shadow p-4 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <div className="flex flex-row mb-2 justify-between items-center">
                <h1 className="text-xl"><strong>Add Member</strong></h1>
                <button onClick={() => toggleAddMember()} className="flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">
                    <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <div className=" flex w-full flex-col ">
                <p className="text-xs mb-2 text-neutral-400">Share this code to allow others to join your chat</p>
                <div className="flex flex-row p-2  dark:text-neutral-300 justify-center dark:bg-neutral-950 rounded-md">
                    {chatID}
                </div>
            </div>
        </div>
    )
}