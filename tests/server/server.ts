import buildServer from './../../src/infrastructure/server'
import fastify, { FastifyInstance } from 'fastify';

export async function createServer(): Promise<FastifyInstance> {
    const app = fastify();

    app.register(buildServer);

    await app.listen({
        port: 3000 + (Number(process.env.VITEST_WORKER_ID) || 0),
        host: "0.0.0.0",
    });

    return app;
}