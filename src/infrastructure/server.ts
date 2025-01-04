import { FastifyInstance } from 'fastify';
import { registerDb } from '../db.config';
import { Car } from '../database/entity/car.entity';

export default async function (app: FastifyInstance) {
    app.register(import('@fastify/sensible'));
    await app.register(import('@fastify/swagger'));
    await app.register(import('@fastify/swagger-ui'), {
        routePrefix: '/documentation'
    });
    await registerDb(app);

    app.ready(() => {
        console.log(app.printRoutes());
    });
}