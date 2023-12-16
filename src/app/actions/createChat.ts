'use server';
import {createChat, Chat} from '@/db';

async function createChatAction(data: string) {
    const dataObj = Chat.convertFromJSON(JSON.parse(data));
    await createChat(dataObj);
    return JSON.stringify(dataObj.convertToJSON());
}

export default createChatAction;