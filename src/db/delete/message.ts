import {db} from '@/db/connect';

async function deleteMessage(id: string, chatId: string) {
    if (!id) throw new Error('No ID provided.');
    const chats = db.collection('chats');
    return await chats.updateOne({_id: chatId}, {$pull: {messages: {_id: id}}});
}

export default deleteMessage;