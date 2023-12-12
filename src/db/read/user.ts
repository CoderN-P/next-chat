import {db} from '@/db/connect';

async function readUser(id: string|null=null, email: string|null=null, username: string|null=null) {
    if (!id && !email && !username) throw new Error('No ID, email, or username provided.');
    const users = db.collection('users');
    if (id) {
        return await users.findOne({_id: id})
    } else if (email) {
        return await users.findOne({email: email})
    } else {
        return await users.findOne({username: username})
    }
}

export default readUser;