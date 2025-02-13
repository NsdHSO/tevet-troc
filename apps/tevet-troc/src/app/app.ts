import { FastifyInstance } from 'fastify';
import { registerDb } from '@tevet-troc/utils';
import { httpResponseBuilder } from '@tevet-troc/http-response';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  await registerDb(fastify);
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

  fastify.ready(() => {
    console.log(fastify.printRoutes());
  });
}
