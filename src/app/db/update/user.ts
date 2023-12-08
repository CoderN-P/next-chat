import client from '@/app/db/connect';

function updateUser(id: string, update: any) {
    if (!id) throw new Error('No ID provided.');
    const db = client.db('test');
    const users = db.collection('users');
    return users.updateOne({_id: id}, {$set: update});
}

export default updateUser;