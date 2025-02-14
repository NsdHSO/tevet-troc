import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import hospitalDao from '../dao/hospitalDao';
import { HospitalEntity } from '@tevet-troc/models';
import { IHospitalHttp, hospitalApplicationService } from '../../applications';
import { DataSource } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    hospitalApplicationService: IHospitalHttp;
    orm: DataSource;
  }
}
export default fp(async (fastify: FastifyInstance) => {
  try {
    const hospitalRepository = hospitalDao(
      fastify.orm.getRepository(HospitalEntity)
    );
    const hospitalService = hospitalApplicationService(hospitalRepository);
    fastify.decorate('hospitalApplicationService', hospitalService);
    fastify.log.info('Hospital Application Service initialized');
  } catch (error) {
    fastify.log.error(`Error registering hospital service: ${error}`);
  }
});
