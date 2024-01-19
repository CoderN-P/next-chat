'use server';
import {readUser} from '@/db';

async function getUser(id?: string | null | undefined, email?: string | null | undefined, username?: string | null | undefined) {
    if (id) return JSON.stringify(await readUser(id));
    if (email) {
        return JSON.stringify(await readUser("", email));
    }
    if (username) return JSON.stringify((await readUser("", "", username)));
    return null;
}

export default getUser;