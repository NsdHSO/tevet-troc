import { FastifyInstance, FastifyReply } from 'fastify';
import { ErrorObject } from '../../../../infrastructure/models/error';
import { HttpCodeW } from '../../../../infrastructure/enums/http-code';

export const handleError = (error: ErrorObject<string, number> | any, app: FastifyInstance, reply: FastifyReply) => {
    app.log.error('Animal Handle', JSON.stringify(error));
    if (error.code === HttpCodeW.NotFound) {
        app.log.error('Animal is not created', error);
        reply.code(HttpCodeW.NotFound);
    } else if (error.code === HttpCodeW.InternalServerError) {
        app.log.error(error.message, error);
        reply.code(HttpCodeW.InternalServerError);
    }
    return {
        registered: false,
        message: error.message
    };
};