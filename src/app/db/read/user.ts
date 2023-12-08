import db from '@/app/db/connect';
import User from '@/app/types/User';

async function readUser(id: string) {
    if (!id) throw new Error('No ID provided.');
    const users = db.collection('users');
    const res = await users.findOne({_id: id})
    return User.convertFromJSON(res);
}

export default readUser;