import { FastifyInstance } from 'fastify';
import { join } from 'path';
import fastifyAutoload from '@fastify/autoload';

export async function hospitalPlugin(app: FastifyInstance) {
  app.register(fastifyAutoload, {
    dir: join(__dirname, 'infrastructure/services'),
    forceESM: true,
  });

  app.register(fastifyAutoload, {
    dir: join(__dirname, 'infrastructure/http/routes'), // Path to your v1 routes
    forceESM: true, // If you're using ES modules
    options: { prefix: '/hospital', },
  });
}
