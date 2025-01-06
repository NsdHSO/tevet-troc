import { FastifyInstance } from 'fastify';

export default function register(app : FastifyInstance) {
    app.post('/register', async (req, reply) => {})
}