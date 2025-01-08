import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (req: FastifyRequest, repl:FastifyReply)=> Promise<any>
    }
}
export default fp(async function (fastify, opts) {
    // Register the JWT plugin
    fastify.register(fastifyJwt, {
        secret: 'supersecret',
    });

    // Add the `authenticate` decorator
    fastify.decorate('authenticate', async function (
        fastifyRequest: FastifyRequest,
        reply: FastifyReply
    ) {
        try {
            await fastifyRequest.jwtVerify();
        } catch (error) {
            reply.status(401).send({ message: 'Unauthorized' });
        }
    });
});