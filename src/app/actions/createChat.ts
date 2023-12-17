'use server';
import {createChat} from '@/db';
import {Chat} from '@/types';

async function createChatAction(data: string) {
    const dataObj = Chat.convertFromJSON(JSON.parse(data));
    await createChat(dataObj);
    return JSON.stringify(dataObj.convertToJSON());
}

export default createChatAction;