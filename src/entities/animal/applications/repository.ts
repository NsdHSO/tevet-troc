import { AnimalCreated, CreateAnimal } from './models';
import { ErrorObject } from '../../../infrastructure/models/error';

export interface IAnimalRepository {
    create(animal: CreateAnimal): Promise<AnimalCreated | ErrorObject<string, number>>;

    findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined>;
}