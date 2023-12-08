import db from '@/app/db/connect'
import Message from '@/app/types/Message'

async function createMessage(message: Message, chatId: string){
    const chats = db.collection('chats')
    return await chats.updateOne({_id: chatId}, {$push: {messages: message.convertToJSON()}})
}

export default createMessage;