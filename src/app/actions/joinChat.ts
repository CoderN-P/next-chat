'use server';
import {readChat, readUser, updateChat, updateUser} from '@/db';

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