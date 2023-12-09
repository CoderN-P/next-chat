import readChat from '@/db/read/chat';
import readUser from '@/db/read/user';
import Chat from '@/types/Chat';

export default async function getChatMembers(chatID: string){
    "use server";

    const chat = await readChat(chatID);
    return chat.users.map((user) => {
        return Chat.convertFromJSON(readUser(user));
    });
}