import { homePlugin } from '@tevet-troc/home';
import { FastifyInstance } from 'fastify';
import { registerDb } from '@tevet-troc/utils';
import { httpResponseBuilder } from '@tevet-troc/http-response';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  await homePlugin.HomePlugin.homePlugin(fastify);
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
          name: 'Hospital',
          description: 'Hospital routes',
        }, // Define the 'hospital' parent tag
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
