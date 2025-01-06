import { FastifyInstance } from 'fastify';

export default function logout(app : FastifyInstance) {
    app.post('/logout', async (req, reply) => {})
}