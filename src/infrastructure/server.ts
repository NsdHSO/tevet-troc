import { FastifyInstance } from 'fastify';
import { registerDb } from '../db.config.js';
import { animalPlugin } from '../entities/animal/index.js';

export default async function (app: FastifyInstance) {
    app.register(import('@fastify/sensible'));
    await app.register(import('@fastify/swagger'));
    await app.register(import('@fastify/swagger-ui'), {
        routePrefix: '/documentation'
    });
    registerDb(app);
    app.ready(() => {
        console.log(app.printRoutes());
    });
}