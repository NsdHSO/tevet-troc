
import fp from 'fastify-plugin';
import animalDao from '../dao/animalDao';
import { animalApplicationService, IAnimalRepository } from '../../applications';
import { AnimalEntity } from '../dao/animal.entity';

declare module 'fastify' {
    interface FastifyInstance {
        animalService: IAnimalRepository;
    }
}
export default fp(async (fastify) => {
    try {
        console.log('Registering animalService...');
        const animalRepository: IAnimalRepository = animalDao(fastify.orm.getRepository(AnimalEntity));
        const animalService = animalApplicationService(animalRepository);
        fastify.decorate('animalService', animalService);
        fastify.log.info('AnimalService registered');
    } catch (error) {
        console.error('Error registering animalService:', error);
    }
});