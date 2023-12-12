'use server';
import Chat from '@/types/Chat';
import readUser from '@/db/read/user';
import {db} from "@/db/connect";

async function getChats(email: string) {
    const user = await readUser("", email);
    const chats = user.chats;
    const chatObjects : Chat[] = [];
    const projection = {
        messages: 0,
    }

    const userCollection = db.collection('users');

    for (let i = 0; i < chats.length; i++) {
        const chat = await userCollection.findOne({_id: chats[i]}, {projection});
        chatObjects.push(Chat.convertFromJSON(chat));
    }

    return chatObjects;
}

export default getChats;