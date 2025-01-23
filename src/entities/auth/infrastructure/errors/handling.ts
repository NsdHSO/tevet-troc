import { ErrorObject } from '../../../../infrastructure/models/error';
import { FastifyInstance, FastifyReply } from 'fastify';
import { HttpCodeW } from '../../../../infrastructure/enums/http-code';

export const handleError = (error: ErrorObject<string, number> | any, app: FastifyInstance, reply: FastifyReply) => {
    app.log.error('Auth when user trying login', JSON.stringify(error));
    if (error.code === HttpCodeW.Unauthorized) {
        app.log.error('User is not created', error);
        reply.code(HttpCodeW.Unauthorized);
    } else if (error.code === HttpCodeW.NotFound) {
        app.log.error(error.message, error);
        reply.code(HttpCodeW.NotFound);
    } else {
        if (error.code === HttpCodeW.NotImplemented) {
            reply.code(HttpCodeW.NotFound);
        }
    }
    return {
        registered: false,
        message: error.message
    };
};