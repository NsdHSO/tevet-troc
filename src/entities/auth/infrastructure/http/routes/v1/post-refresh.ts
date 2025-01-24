import { FastifyInstance } from 'fastify';
import { AuthBearerHeader } from '../../schema';
import { handleError } from '../../../errors/handling';

import { httpResponseBuilder } from '../../../../../../infrastructure/models/httResponseBuilder';

export default function refresh(app: FastifyInstance) {
    app.post('/refresh', {
        onRequest: [app.generateRefreshToken],
        schema: {
            tags: ['auth'],
            headers: AuthBearerHeader
        }
    }, async (req, reply) => {
        try {
            await app.userAuthApplicationService.refresh(req.user);
            return httpResponseBuilder.OK(req.generateToken(reply))
        } catch (error) {
            return handleError(error, app, reply);
        }
    });
}
