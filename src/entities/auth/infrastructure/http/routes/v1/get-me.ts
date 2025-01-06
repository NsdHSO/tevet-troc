import { FastifyInstance } from 'fastify';

export default function getMe(app : FastifyInstance) {
    app.get('/me', async (req, reply) => {})
}