import { FastifyInstance, FastifyRequest } from 'fastify';
import { LoginResponses, LoginUser, LoginUserType } from '../../schema';
import { handleError } from '../../../errors/handling';

import { httpResponseBuilder } from '../../../../../../infrastructure/models/httResponseBuilder';

export default function authenticate(app: FastifyInstance) {
    app.post('/authenticate', {
        schema: {
            tags: ['auth'],
            body: LoginUser,
            response: LoginResponses
        },
    }, async (req: FastifyRequest<{ Body: LoginUserType }>, reply) => {
        try {
            req.user = (await app.userAuthApplicationService.authenticate({ ...req.body }, req.refreshToken().refreshToken) as any).message;
            return httpResponseBuilder.OK(req.generateToken(reply));
        } catch (error) {
            handleError(error, app, reply);
        }
    });
}