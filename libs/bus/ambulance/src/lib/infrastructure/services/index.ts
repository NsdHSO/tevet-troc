import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import ambulanceDao from '../dao/ambulanceDao';
import { AmbulanceEntity } from '@tevet-troc/models';
import {
  IAmbulanceHttp,
  ambulanceApplicationService,
} from '../../applications';
import { DataSource } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    ambulanceApplicationService: IAmbulanceHttp;
    orm: DataSource;
  }
}
export default fp(async (fastify: FastifyInstance) => {
  try {
    const ambulanceRepository = ambulanceDao(
      fastify.orm.getRepository(AmbulanceEntity)
    );
    const ambulanceService = ambulanceApplicationService(ambulanceRepository);
    fastify.decorate('ambulanceApplicationService', ambulanceService);
  } catch (error) {
    fastify.log.error(`Error registering ambulance service: ${error}`);
  }
});
