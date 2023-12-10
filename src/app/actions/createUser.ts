'use server';
import createUser from "@/db/create/user";
import User from "@/types/User";

async function createUserServer(data: User) {
    // idx is the index of the last message loaded
    // limit is the number of messages to load
    // chatId is the id of the chat to load messages from
    return await createUser(data);
}

export default createUserServer;