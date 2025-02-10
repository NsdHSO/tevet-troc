import { HttpCodeW } from "./model";

export type ResponseObject<K, T extends HttpCodeW> = { message: K; code: T };

export function isErrorObject<K, T extends HttpCodeW>(obj): obj is ResponseObject<K, T> {
    return 'message' in obj && 'code' in obj;
}

export function createResponse<K, T extends HttpCodeW>(message: K, code: T): ResponseObject<K, T> {
    return {
        message,
        code
    };
}

