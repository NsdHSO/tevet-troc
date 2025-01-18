import { FastifyInstance } from 'fastify';
import { Header } from '../../schema';

export default function refresh(app: FastifyInstance) {
    app.post('/refresh', {
        schema: {
            tags: ['auth'],
            headers: Header
        }
    }, async (req, reply) => {
        return req.generateRefreshToken(req, reply);
    });
}