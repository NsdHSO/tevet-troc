import { AnimalCreated, CreateAnimal } from './models';
import { ErrorObject } from '../../../infrastructure/models/error';
import { LoginUser } from '../../auth/applications';

export interface IAnimalRepository {
    create(animal: CreateAnimal): Promise<AnimalCreated>;
    findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined>;
}