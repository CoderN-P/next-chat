import {db} from '../connect';


async function updateMessage(id: string, chatId: string, message: Map<string, any>) {
    const newMessage: Map<string, any> = new Map<string, any>();
    for (let key in message) {
        newMessage.set(`messages.$[element].${key}`, message.get(key));
    }
    if (!id) throw new Error('No ID provided.');
    const chats = db.collection('chats');
    return await chats.updateOne({_id: chatId}, {$set: newMessage}, {arrayFilters: [{'element._id': id}]});
}

export {updateMessage};