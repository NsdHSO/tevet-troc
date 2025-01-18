import { FastifyInstance } from 'fastify';
import { Header } from '../../schema';

export default function refresh(app: FastifyInstance) {
    app.post('/refresh', {
        onRequest: [app.generateRefreshToken],
        schema: {
            tags: ['auth'],
            headers: Header
        }
    }, async (req, reply) => {
        return reply.send(req.generateToken(reply));
    });
}