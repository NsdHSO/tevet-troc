import { FastifyInstance, FastifyRequest } from 'fastify';
import { UserCreate, UserCreateType } from '../../schema';
import { ErrorObject } from '../../../../../../infrastructure/models/error';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';
import { httpResponseBuilder } from '../../../../../../infrastructure/models/httResponseBuilder';

export default function (app: FastifyInstance) {
    app.post('/register', {
        schema: {
            tags: ['auth'],
            body: UserCreate
        }
    }, async (req: FastifyRequest<{ Body: UserCreateType }>, reply) => {
        try {
            const newUser = await app.userAuthApplicationService.register({
                ...req
                .body,
                ...req.refreshToken()
            });
            app.log.info('Registered user', newUser);
            return httpResponseBuilder.OK(newUser)

        } catch (error: ErrorObject<string, number> | any) {
            app.log.error('Registered when user is register', error);
            reply.code(error.code);
            return { registered: false , message: error.message };
        }
    });
}
