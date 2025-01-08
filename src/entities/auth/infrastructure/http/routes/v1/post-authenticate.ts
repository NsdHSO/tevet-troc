import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { LoginUser, LoginUserType } from '../../schema';
import { ErrorObject } from '../../../../../../infrastructure/models/error';

export default function authenticate(app: FastifyInstance) {
    app.post('/authenticate', {
        schema: {
            body: LoginUser
        },
    }, async (req: FastifyRequest<{ Body: LoginUserType }>, reply) => {
        try {
            const user = await app.userAuthApplicationService.authenticate(req.body);
            app.log.info(JSON.stringify(user) + 'Is logged in');
            reply.code(200).send(app.jwt.sign({ user }));
        } catch (error) {
            handleError(error, app, reply);
        }
    });
}

const handleError = (error: ErrorObject<string, number> | any, app: FastifyInstance, reply: FastifyReply) => {
    app.log.error('Auth when user trying login', error);
    if (error.code === 401) {
        app.log.error('User is not created', error);
    } else if (error.code === 404) {
        app.log.error(error.message, error);
    }
    reply.code(404);
    return {
        registered: false,
        message: error.message
    };
};