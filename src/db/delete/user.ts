import {db} from '../connect';
const mongodb = require('mongodb');

async function deleteUser(id: string) {
    if (!id) throw new Error('No ID provided.');
    const users = db.collection('users');
    const objectId = mongodb.ObjectId.createFromHexString(id);
    return await users.deleteOne({_id: objectId});
}

export {deleteUser};