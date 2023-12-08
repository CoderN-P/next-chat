import db from '@/app/db/connect'
import Chat from '@/app/types/Chat'

async function createChat(chat: Chat){
  const chats = db.collection('chats');
  return await chats.insertOne(chat.convertToJSON());
}

export default createChat;