import { FastifyInstance } from 'fastify';

export default function refresh(app : FastifyInstance) {
    app.post('/refresh', async (req, reply) => {})
}