import { FastifyInstance, FastifyRequest } from 'fastify';
import { UserCreate, UserCreateType } from '../../schema';
import { ErrorObject } from '../../../../../../infrastructure/models/error';

export default function (app: FastifyInstance) {
    app.post('/register', {
        schema: {
            body: UserCreate
        }
    }, async (req: FastifyRequest<{ Body: UserCreateType }>, reply) => {
        try {
            const newUser = await app.userAuthApplicationService.register(req.body);
            app.log.info('Registered user', newUser);
            reply.code(201).send(newUser);

        } catch (error: ErrorObject<string, number> | any) {
            app.log.error('Registered when user is register', error);
            reply.code(error.code);
            return { registered: false , message: error.message };
        }
    });
}