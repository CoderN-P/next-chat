'use server';
import createChat from '@/db/create/chat';
import Chat from "@/types/Chat";

async function createChatAction(data: string) {
    const dataObj = Chat.convertFromJSON(JSON.parse(data));
    await createChat(dataObj);
    return JSON.stringify(dataObj.convertToJSON());
}

export default createChatAction;