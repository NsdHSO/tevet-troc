import * as crypto from 'node:crypto';
import util from 'node:util';

const pbkdf2 = util.promisify(crypto.pbkdf2);

export async function generateHash(password: string, salt?: string) {
    if (!salt) {
        salt = crypto.randomBytes(16).toString('hex');
    }

    const hash = (await pbkdf2(password, salt, 1000, 64, 'sha256')).toString('hex');

    return { salt, hash };

}