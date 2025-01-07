import { FastifyInstance, FastifyRequest } from 'fastify';
import { UserCreate, UserCreateType } from '../../schema';

export default function register(app: FastifyInstance) {
    app.post('/register', {
        schema: {
            body: UserCreate
        }
    }, async (req: FastifyRequest<{ Body: UserCreateType }>, reply) => {
        try {
            const newUser = await app.userAuthApplicationService.register(req.body);
            app.log.info('Registered user', newUser);
            reply.code(200).send(newUser);

        } catch (error) {
            app.log.error('Registered user', error);
            reply.code(500);
            return { registered: false };
        }
    });
}