import {db} from '../connect';
import {Chat} from '../../types'

async function readChat(id: string){
    const chats = db.collection('chats');
    const res = await chats.findOne({_id: id});
    return Chat.convertFromJSON(res);
}

export {readChat};