import { randomBytes ,pbkdf2Sync} from 'node:crypto';


export async function generateHash(password: string, salt?: string) {
    // Generate a new salt if not provided
    const saltValue = salt || randomBytes(16).toString('hex');

    // Define the number of iterations and key length
    const iterations = 100000;
    const keyLength = 64;

    // Generate the hash using pbkdf2Sync
    const hash = pbkdf2Sync(password, saltValue, iterations, keyLength, 'sha256').toString('hex');

    return { salt: saltValue, hash };

}
export function generateRefreshToken() {
    return {
        refreshToken: randomBytes(64).toString('hex'),
    }
}