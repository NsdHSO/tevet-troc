import { FastifyInstance } from 'fastify';

export default function authenticate(app : FastifyInstance) {
    app.post('/authenticate', async (req, reply) => {})
}