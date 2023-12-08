import db from '@/app/db/connect'
import Chat from '@/app/types/Chat'

async function readChat(id: string){
    const chats = db.collection('chats');
    const res = await chats.findOne({_id: id});
    return Chat.convertFromJSON(res);
}

export default readChat;