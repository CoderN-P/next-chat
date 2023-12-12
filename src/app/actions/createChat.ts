'use server';
import createChat from '@/db/create/chat';
import Chat from "@/types/Chat";

async function createChatAction(data: string) {
    const dataObj = JSON.parse(data);
    return await createChat(Chat.convertFromJSON(dataObj));
}

export default createChatAction;