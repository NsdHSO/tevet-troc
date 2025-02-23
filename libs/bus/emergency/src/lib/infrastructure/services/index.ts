import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import emergencyDao from '../dao/emergencyDao';
import { EmergencyEntity, IEmergencyHttp } from '@tevet-troc/models';
import { emergencyApplicationService } from '../../applications';
import { DataSource } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    emergencyApplicationService: IEmergencyHttp;
    orm: DataSource;
  }
}
export default fp(async (fastify: FastifyInstance) => {
  try {
    const emergencyRepository = emergencyDao(
      fastify.orm.getRepository(EmergencyEntity),
      fastify
    );
    const emergencyService = emergencyApplicationService(emergencyRepository);
    fastify.decorate('emergencyApplicationService', emergencyService);
  } catch (error) {
    fastify.log.error(`Error registering emergency service: ${error}`);
  }
});
