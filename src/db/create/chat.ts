import db from '@/db/connect'
import Chat from '@/types/Chat'

async function createChat(chat: Chat){
  const chats = db.collection('chats');
  return await chats.insertOne(chat.convertToJSON());
}

export default createChat;