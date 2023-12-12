import {db} from '@/db/connect';

async function deleteChat(id: string) {
    if (!id) throw new Error('No ID provided.');
    const chats = db.collection('chats');
    const chat = chats.findOne({_id: id});
    for (let member of chat.members) {
        await db.collection('users').updateOne({_id: member}, {$pull: {chats: id}});
    }
    return await chats.deleteOne({_id: id});
}

export default deleteChat;