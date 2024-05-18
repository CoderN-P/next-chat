import {db} from '../connect.ts';
import {Chat} from '../../types'

async function readChat(id: string){
    const chats = db.collection('chats');
    const res = await chats.findOne({_id: id});

    if (res === null){
        return null;
    }

    return Chat.convertFromJSON(res);
}

export {readChat};