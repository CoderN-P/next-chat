import {db} from '../connect';
import {User} from '../types/User';

const mongodb = require('mongodb');


async function readUser(id: string|null=null, email: string|null=null, username: string|null=null) {
    if (!id && !email && !username) throw new Error('No ID, email, or username provided.');
    const users = db.collection('users');
    if (id) {
        const objectId = mongodb.ObjectId.createFromHexString(id);
        return User.convertFromJSON(await users.findOne({_id: objectId}));
    } else if (email) {
        return User.convertFromJSON(await users.findOne({email: email}));
    } else {
        return User.convertFromJSON(await users.findOne({username: username}))
    }
}

export {readUser};