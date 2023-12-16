"use server";
import {readChat, readUser} from '@/db';

export default async function getChatMembers(chatID: string){
    const chat = await readChat(chatID);
    const members = [];
    for (let i = 0; i < chat.users.length; i++) {
        const member = await readUser(chat.users[i]);
        members.push(member.convertToJSON());
    }
    return JSON.stringify(members);
}