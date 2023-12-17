import {db} from '../connect';
import {Message} from '../../types';

async function createMessage(message: Message, chatId: string){
    const chats = db.collection('chats')
    return await chats.updateOne({_id: chatId}, {$push: {messages: message.convertToJSON()}})
}

export {createMessage};