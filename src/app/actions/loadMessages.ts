'use server';
import {readChat} from "@/db/read/chat.ts";

async function loadMessages(chatId: string, idx: number, limit: number) {
    // idx is the index of the last message loaded
    // limit is the number of messages to load
    // chatId is the id of the chat to load messages from
    const chat = await readChat(chatId);
    if (chat == null) {
        return JSON.stringify({messages: [], newIDX: 0});
    }
    const messages = chat.messages;
    const length = messages.length;
    idx = length - idx - 1;
    if (idx < 0) {
        return JSON.stringify({messages: [], newIDX: length-1});
    }
    if (idx < limit) {
        const newMessages = messages.slice(0, idx+1);
        console.log(newMessages);
        return JSON.stringify({messages: newMessages, newIDX: length-1});
    }
    const newMessages = messages.slice(Math.max(idx-limit, 0), idx+1);
    console.log(newMessages);
    return JSON.stringify({messages: newMessages, newIDX: length-idx+limit})
}

export default loadMessages;