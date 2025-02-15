import { swaggerPlugin } from '@tevet-troc/swagger';
import { hospitalPlugin } from '@tevet-troc/hospital';
import { homePlugin } from '@tevet-troc/home';
import { FastifyInstance } from 'fastify';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  fastify.register(import('@fastify/sensible'));
  await homePlugin.HomePlugin.homePlugin(fastify);
  await hospitalPlugin.HospitalPlugin.hospitalPlugin(fastify);
  await swaggerPlugin.SwaggerPlugin.swaggerPlugin(fastify);

  fastify.ready(() => {
    console.log(fastify.printRoutes());
  });
}
