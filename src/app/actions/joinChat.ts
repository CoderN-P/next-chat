'use server';
import {readChat} from '@/db/read/chat.ts';
import {updateChat} from '@/db/update/chat.ts';
import {updateUser} from '@/db/update/user.ts';


async function joinChatAction(data: string) {
    const dataObj = JSON.parse(data);
    const chatID = dataObj["chatID"];
    const chat = await readChat(chatID);
    if (chat) {
        await updateUser(dataObj["userID"], {$push: {chats: chatID}});
        await updateChat(chatID, {$push: {users: dataObj["userID"]}});
        return JSON.stringify(chat.convertToJSON());
    } else {
        return JSON.stringify({error: "Chat not found."});
    }

}

export default joinChatAction;