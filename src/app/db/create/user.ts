import client from '@/app/db/connect';
import User from '@/app/types/User';
function createUser(user: User) {
  const db = client.db('test');
  const users = db.collection('users');
  return users.insertOne(user.convertToJSON());
}

export default createUser;


