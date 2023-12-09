import db from '@/db/connect';

// NOTE: This function should not be used to edit messages. Use updateMessage instead.
async function updateChat(id: string, update: Map<string, any>) {
    if (!id) throw new Error('No ID provided.')
    const chats = db.collection('chats')
    return await chats.updateOne({_id: id}, {$set: update})
}

export default updateChat