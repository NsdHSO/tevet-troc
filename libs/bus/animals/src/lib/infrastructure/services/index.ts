import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import animalsDao from '../dao/animalsDao';
import { AnimalsEntity } from '@tevet-troc/models';
import { IAnimalsHttp, animalsApplicationService } from '../../applications';
import { DataSource } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    animalsApplicationService: IAnimalsHttp;
    orm: DataSource;
  }
}
export default fp(async (fastify: FastifyInstance) => {
  try {
    const animalsRepository = animalsDao(
      fastify.orm.getRepository(AnimalsEntity)
    );
    const animalsService = animalsApplicationService(animalsRepository);
    fastify.decorate('animalsApplicationService', animalsService);
  } catch (error) {
    fastify.log.error(`Error registering animals service: ${error}`);
  }
});
