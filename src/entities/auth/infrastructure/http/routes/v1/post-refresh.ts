import { FastifyInstance } from 'fastify';
import { Header } from '../../schema';
import { handleError } from '../../../errors/handling';

export default function refresh(app: FastifyInstance) {
    app.post('/refresh', {
        onRequest: [app.generateRefreshToken],
        schema: {
            tags: ['auth'],
            headers: Header
        }
    }, async (req, reply) => {
        try {
            await app.userAuthApplicationService.refresh(req.user);
            return reply.send(req.generateToken(reply));
        } catch (error) {
            return handleError(error, app, reply);
        }
    });
}
