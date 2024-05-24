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
    const length = messages.length; // 100
    console.log(length, idx, limit);

    if (idx >= length) {
        return JSON.stringify({messages: [], newIDX: length});
    }

    const idxInOG = length - idx; // 100
    if (idxInOG <= limit) {
        const newMessages = messages.slice(0, idxInOG);
        console.log(newMessages.length, newMessages[0]);
        return JSON.stringify({messages: newMessages, newIDX: length});
    }

    const newMessages = messages.slice(idxInOG-limit, idxInOG);
    console.log(newMessages.length, newMessages[0]);
    return JSON.stringify({messages: newMessages, newIDX: length-idxInOG+limit});
}

export default loadMessages;