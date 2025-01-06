import { FastifyInstance } from 'fastify';
import { animalPlugin } from '../entities/animal';

export default async function (app: FastifyInstance) {
    app.register(import('@fastify/sensible'));
    await app.register(import('@fastify/swagger'));
    await app.register(import('@fastify/swagger-ui'), {
        routePrefix: '/documentation'
    });
    await animalPlugin(app);
    app.ready(() => {
        console.log(app.printRoutes());
    });
}