import { customAlphabet } from 'nanoid';

export function generateAlias() {
    return customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8)();
}