import {db} from '../connect';
import {User} from '../../types';

const mongodb = require('mongodb');

async function readUser(id: string|null=null, email: string|null=null, username: string|null=null) {
    if (!id && !email && !username) throw new Error('No ID, email, or username provided.');
    const users = db.collection('users');
    if (id) {
        const objectId = mongodb.ObjectId.createFromHexString(id);
        const res = await users.findOne({_id: objectId});
        if (!res) return null;
        return User.convertFromJSON(res);
    } else if (email) {
        const res = await users.findOne({email: email});
        if (!res) return null;
        return User.convertFromJSON(res);
    } else {
        const res = await users.findOne({username: username});
        if (!res) return null;
        return User.convertFromJSON(res);
    }
}

export {readUser};