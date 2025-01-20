import { ErrorObject } from '../../../../infrastructure/models/error';
import { FastifyInstance, FastifyReply } from 'fastify';

export const handleError = (error: ErrorObject<string, number> | any, app: FastifyInstance, reply: FastifyReply) => {
    app.log.error('Auth when user trying login', JSON.stringify(error));
    if (error.code === 401) {
        app.log.error('User is not created', error);
        reply.code(401);
    } else if (error.code === 404) {
        app.log.error(error.message, error);
        reply.code(404);
    } else {
        if (error.code === 501) {
            reply.code(404);
        }
    }
    return {
        registered: false,
        message: error.message
    };
};