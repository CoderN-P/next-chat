import db from '@/app/db/connect';
import Message from '@/app/types/Message';

async function readMessage(id: string, chatId: string) {
    const chats = db.collection('chats');
    const res = await chats.findOne({_id: chatId, 'messages._id': id});
    return Message.convertFromJSON(res);
}

export default readMessage;