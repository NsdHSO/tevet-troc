import { PluginDataSource } from 'typeorm-fastify-plugin';
import { AnimalCreated, CreateAnimal, IAnimalRepository } from '../../applications';

export default function (db: PluginDataSource): IAnimalRepository {
    return {
        findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined> {
            return Promise.resolve(undefined);
        },
        create(animal: CreateAnimal): Promise<AnimalCreated> {
            return Promise.resolve({} as AnimalCreated);
        }
    };
}