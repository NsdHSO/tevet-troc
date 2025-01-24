// Define a factory object with methods for each HTTP code
import { HttpCodeW } from '../enums/http-code';
import { createError, ErrorObject } from './error';

export const httpResponseBuilder = {
    OK: <K>(message: K): ErrorObject<K, HttpCodeW.OK> =>
        createError(message, HttpCodeW.OK),

    Created: <K>(message: K): ErrorObject<K, HttpCodeW.Created> =>
        createError(message, HttpCodeW.Created),

    NoContent: <K>(message: K): ErrorObject<K, HttpCodeW.NoContent> =>
        createError(message, HttpCodeW.NoContent),

    BadRequest: <K>(message: K): ErrorObject<K, HttpCodeW.BadRequest> =>
        createError(message, HttpCodeW.BadRequest),

    Unauthorized: <K>(message: K): ErrorObject<K, HttpCodeW.Unauthorized> =>
        createError(message, HttpCodeW.Unauthorized),
    Conflict: <K>(message: K): ErrorObject<K, HttpCodeW.Conflict> =>
        createError(message, HttpCodeW.Conflict),
    NotFound: <K>(message: K): ErrorObject<K, HttpCodeW.NotFound> =>
        createError(message, HttpCodeW.NotFound),
    NotImplemented: <K>(message: K): ErrorObject<K, HttpCodeW.NotImplemented> =>
        createError(message, HttpCodeW.NotImplemented),
    InternalServerError: <K>(message: K): ErrorObject<K, HttpCodeW.InternalServerError> =>
        createError(message, HttpCodeW.InternalServerError),
};