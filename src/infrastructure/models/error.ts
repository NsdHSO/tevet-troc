import { HttpCodeW } from '../enums/http-code';

export type ErrorObject<K, T extends HttpCodeW> = { message: K; code: T };

export function isErrorObject<K, T extends HttpCodeW>(obj: any): obj is ErrorObject<K, T> {
    return 'message' in obj && 'code' in obj;
}

export function createError<K, T extends HttpCodeW>(message: K, code: T): ErrorObject<K, T> {
    return {
        message,
        code
    };
}

