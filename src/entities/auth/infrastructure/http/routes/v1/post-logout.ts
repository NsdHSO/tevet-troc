import { FastifyInstance } from 'fastify';
import { Header } from '../../schema';

export default function logout(app: FastifyInstance) {
    app.post('/logout', {
        onRequest: [app.authenticate],
        schema: {
            headers: Header
        }
    }, async (req, reply) => {
        req.revokeToken();
        reply.code(204);

    });
}