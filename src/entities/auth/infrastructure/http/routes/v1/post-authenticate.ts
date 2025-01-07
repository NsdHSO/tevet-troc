import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { LoginUser, LoginUserType } from '../../schema';
import { ErrorObject } from '../../../../../../infrastructure/models/error';

export default function authenticate(app: FastifyInstance) {
    app.post('/authenticate', {
        schema: {
            body: LoginUser
        }
    }, async (req: FastifyRequest<{ Body: LoginUserType }>, reply) => {
        try {
            const user = app.userAuthApplicationService.authenticate(req.body)
                .catch(error => handleError(error, app, reply));
            app.log.info(JSON.stringify(user) + 'Is logged in');
            reply.code(200).send({ token: 'sfdsdfsdf' });
        } catch (error) {
            handleError(error, app, reply);
        }
    });
}

const handleError = (error: ErrorObject<string, number> | any, app: FastifyInstance, reply: FastifyReply) => {2
    app.log.error('Registered when user trying login', error);
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