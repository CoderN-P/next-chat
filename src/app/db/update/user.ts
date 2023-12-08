import db from '@/app/db/connect';

async function updateUser(id: string, update: Map<string, any>) {
    if (!id) throw new Error('No ID provided.');
    const users = db.collection('users');
    return await users.updateOne({_id: id}, {$set: update});
}

export default updateUser;