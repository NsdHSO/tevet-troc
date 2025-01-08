import { FastifyInstance } from 'fastify';
import { animalPlugin } from '../entities/animal';
import { authPlugin } from '../entities/auth';

export default async function (app: FastifyInstance) {

    app.register(import('@fastify/sensible'));
    await app.register(import('@fastify/swagger'),{
        swagger: {
            info: {
                title: 'API Documentation',
                description: 'This is the API documentation for our service.',
                version: '1.0.0'
            },
            tags: [
                { name: 'auth', description: 'Authentication-related routes' } // Define the 'auth' parent tag
            ],
        },
    });
    await app.register(import('@fastify/swagger-ui'), {
        routePrefix: '/documentation'
    });
    await authPlugin(app);
    await animalPlugin(app);
    app.ready(() => {
        console.log(app.printRoutes());
    });
}