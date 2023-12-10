import db from '@/db/connect';
import User from '@/types/User';

async function readUser(id: string|null=null, email: string|null=null, username: string|null=null) {
    if (!id && !email && !username) throw new Error('No ID, email, or username provided.');
    const users = db.collection('users');
    if (id) {
        const res = await users.findOne({_id: id})
        return new User(res)
    } else if (email) {
        const res = await users.findOne({email: email})
        return new User(res)
    } else {
        const res = await users.findOne({username: username})
        return new User(res)
    }
}

export default readUser;