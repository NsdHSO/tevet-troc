import { FastifyInstance } from 'fastify';

export async function swaggerPlugin(app: FastifyInstance) {
  await app.register(import('@fastify/swagger'), {
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
  await app.register(import('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
  });
}
