'use server';
import Chat from '@/types/Chat';
import readUser from '@/db/read/user';
import {db} from "@/db/connect";

async function getChats(id: string) {
    const user = await readUser(id);
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