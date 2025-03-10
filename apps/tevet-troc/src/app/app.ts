import { emergencyPlugin } from '@tevet-troc/emergency';
import { ambulancePlugin } from '@tevet-troc/ambulance';
import { swaggerPlugin } from '@tevet-troc/swagger';
import { hospitalPlugin } from '@tevet-troc/hospital';
import { homePlugin } from '@tevet-troc/home';
import { FastifyInstance } from 'fastify';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  fastify.register(import('@fastify/sensible'));
  await swaggerPlugin.SwaggerPlugin.swaggerPlugin(fastify);
  await homePlugin.HomePlugin.homePlugin(fastify);
  await hospitalPlugin.HospitalPlugin.hospitalPlugin(fastify);
  await ambulancePlugin.AmbulancePlugin.ambulancePlugin(fastify);
  await emergencyPlugin.EmergencyPlugin.emergencyPlugin(fastify);

  fastify.ready(() => {
    console.log(fastify.printRoutes());
  });
}
