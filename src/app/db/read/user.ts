import client from '@/app/db/connect';
import User from '@/app/types/User';

function readUser(id: string) {
    if (!id) throw new Error('No ID provided.');
    const db = client.db('test');
    const users = db.collection('users');
    return User.convertFromJSON(users.findOne({_id: id}));
}

export default readUser;