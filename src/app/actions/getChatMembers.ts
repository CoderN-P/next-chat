"use server";
import {readChat, readUser} from '@/db';
import {User} from '@/types';

export default async function getChatMembers(chatID: string){
    const chat = await readChat(chatID);
    if (!chat){
        return [];
    }
    const members = [];
    for (let i = 0; i < chat.users.length; i++) {
        const member = await readUser(chat.users[i]) as User;
        members.push(member.convertToJSON());
    }
    return JSON.stringify(members);
}