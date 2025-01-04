
import fp from 'fastify-plugin';
import animalDao from '../dao/animalDao.js';
import { animalApplicationService, IAnimalRepository } from '../../applications';

declare module 'fastify' {
    interface FastifyInstance {
        animalService: IAnimalRepository;
    }
}
export default fp(async (fastify) => {
    const animalRepository: IAnimalRepository = animalDao(fastify.orm);
    const animalService = animalApplicationService(animalRepository);
    fastify.decorate('animalService', animalService);
    fastify.log.info('AnimalService registered');
});