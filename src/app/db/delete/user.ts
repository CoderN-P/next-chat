import client from '@/app/db/connect';

function deleteUser(id: string) {
    if (!id) throw new Error('No ID provided.');
    const db = client.db('test');
    const users = db.collection('users');
    return users.deleteOne({_id: id});
}

export default deleteUser;