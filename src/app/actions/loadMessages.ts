import readChat from "@/db/read/chat";
import MessagesResponse from "@/types/MessagesResponse";

async function loadMessages(chatId: string, idx: number, limit: number) {
    'use server'
    // idx is the index of the last message loaded
    // limit is the number of messages to load
    // chatId is the id of the chat to load messages from
    const chat = await readChat(chatId);
    const messages = chat.messages;
    const length = messages.length;
    idx = length - idx - 1;

    if (idx === 0) {
        const newMessages = messages.slice(idx-limit, idx);
        return new MessagesResponse(
            [],
            0
        );
    }
    if (idx < limit) {
        const newMessages = messages.slice(0, idx);
        return new MessagesResponse(
            newMessages,
            length-1
        );
    }
    const newMessages = messages.slice(idx-limit, idx);
    return new MessagesResponse(
        newMessages,
        length-idx-limit
    );
}

export default loadMessages;