import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import animalDao from '../dao/animalDao';
import { AnimalEntity } from '../dao/animal.entity';
import { IAnimalHttp, animalApplicationService } from '../../applications';
import { DataSource } from 'typeorm';

declare module 'fastify' {
  interface FastifyInstance {
    animalApplicationService: IAnimalHttp;
    orm: DataSource;
  }
}
export default fp(async (fastify: FastifyInstance) => {
  try {
    const animalRepository = animalDao(fastify.orm.getRepository(AnimalEntity));
    const animalService = animalApplicationService(animalRepository);
    fastify.decorate('animalApplicationService', animalService);
  } catch (error) {
    fastify.log.error(`Error registering animal service: ${error}`);
  }
});
