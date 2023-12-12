export default function CreateChatUI() {
  return (
    <div className="absolute z-50 top-16 w-full rounded-md border dark:border-neutral-800 left-24 items-center shadow p-4 dark:bg-neutral-900 dark:hover:bg-neutral-800">
      <div className="flex flex-row mb-2 justify-between items-center">
        <h1 className="text-xl"><strong>Name</strong></h1>
            <button className="flex flex-row justify-center items-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">
                <svg className="w-6 h-6 text-neutral-500 dark:text-neutral-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
      </div>
        <div className="mb-2 flex w-full flex-row items-center justify-end dark:bg-neutral-950 rounded-md">
        <input type="text" className=" flex-1 w-4/5 rounded-md border-l dark:border-neutral-800 p-2 dark:bg-neutral-950 dark:hover:bg-neutral-900" placeholder="Enter a name"/>
            <svg className="w-6 h-6 mx-2 text-green-400 dark:hover:text-green-400 dark:text-green-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path></svg>
        </div>
        <p className="hidden">Share Code <code className="dark:bg-neutral-950 p-2 rounded-md mx-2">1234</code> </p>
    </div>
  )
}