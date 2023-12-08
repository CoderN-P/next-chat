import db from '@/app/db/connect';
import User from '@/app/types/User';

async function createUser(user: User) {
  const users = db.collection('users');
  return await users.insertOne(user.convertToJSON());
}

export default createUser;


