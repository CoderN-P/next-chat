import {db} from '@/db/connect';
import Chat from '@/types/Chat'
const mongodb = require('mongodb');

async function createChat(chat: Chat){
  const chats = db.collection('chats');
  for (let i = 0; i < chat.users.length; i++) {
    const user = chat.users[i];
    const userCollection = db.collection('users');
    const objectId = mongodb.ObjectId.createFromHexString(user);
    await userCollection.updateOne({_id: objectId}, {$push: {chats: chat._id}});
  }
  await chats.insertOne(chat.convertToJSON());
}

export default createChat;