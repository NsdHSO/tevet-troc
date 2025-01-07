export type ErrorObject<K,T> = { message: K; code: T };
export function isErrorObject<K, T>(obj: any): obj is ErrorObject<K, T> {
    return 'message' in obj && 'code' in obj;
}

export function createError<K,T>( message: K, code: T ): ErrorObject<K, T> {
    return { message: message, code: code };
}