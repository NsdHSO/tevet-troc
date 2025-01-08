import { FastifyInstance } from 'fastify';
import { animalPlugin } from '../entities/animal';
import { authPlugin } from '../entities/auth';

export default async function (app: FastifyInstance) {

    app.register(import('@fastify/sensible'));
    await app.register(import('@fastify/swagger'));
    await app.register(import('@fastify/swagger-ui'), {
        routePrefix: '/documentation'
    });
    await authPlugin(app);
    await animalPlugin(app);
    app.ready(() => {
        console.log(app.printRoutes());
    });
}