import {db} from '../connect';
const mongodb = require('mongodb');

async function updateUser(id: string, update: { $push: { chats: any } }) {
    if (!id) throw new Error('No ID provided.');
    const users = db.collection('users');
    const objectId = mongodb.ObjectId.createFromHexString(id);
    return await users.updateOne({_id: objectId}, {$set: update});
}

export {updateUser};