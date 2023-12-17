import {db} from '../connect';
import {Message} from '../../types';

async function readMessage(id: string, chatId: string) {
    const chats = db.collection('chats');
    const res = await chats.findOne({_id: chatId, 'messages._id': id});
    return Message.convertFromJSON(res);
}

export {readMessage};