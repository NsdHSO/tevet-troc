import { animalPlugin } from '@tevet-troc/animal';
import { FastifyInstance } from 'fastify';
import { registerDb } from '@tevet-troc/utils';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  fastify.register(import('@fastify/sensible'));
  await fastify.register(import('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'API Documentation',
        description: 'This is the API documentation for our service.',
        version: '1.0.0',
      },
      tags: [
        {
          name: 'auth',
          description: 'Authentication-related routes',
        }, // Define the 'auth' parent tag
      ],
    },
  });
  await fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
  });
  await fastify.register(registerDb);
  await animalPlugin.AnimalPlugin.animalPlugin(fastify);

  fastify.ready(() => {
    console.log(fastify.printRoutes());
  });
}
