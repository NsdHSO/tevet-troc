import { AnimalCreated, CreateAnimal } from './models';

export interface IAnimalRepository {
    create(animal: CreateAnimal): Promise<AnimalCreated>;

    findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined>;
}