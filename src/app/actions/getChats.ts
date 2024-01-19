'use server';
import {readUser, db} from '@/db';
import {Chat} from '@/types';

async function getChats(id: string) {
    const user = await readUser(id);
    if (!user) return null;
    const chats = user.chats;
    const chatObjects : Chat[] = [];
    const projection = {
        messages: 0,
    }


    const chatCollection = db.collection('chats');
    for (let i = 0; i < chats.length; i++) {
        const chat = await chatCollection.findOne({_id: chats[i]}, {projection: projection});
        chatObjects.push(chat);
    }

    return JSON.stringify(chatObjects);
}

export default getChats;