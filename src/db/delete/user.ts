import {db} from '@/db/connect';

async function deleteUser(id: string) {
    if (!id) throw new Error('No ID provided.');
    const users = db.collection('users');
    return await users.deleteOne({_id: id});
}

export default deleteUser;