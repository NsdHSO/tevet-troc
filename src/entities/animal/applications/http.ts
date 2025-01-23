import { AnimalCreated, CreateAnimal } from './index';
import { ErrorObject } from '../../../infrastructure/models/error';
import { LoginUser } from '../../auth/applications';

export interface IAnimalHttp {
    create(animal: CreateAnimal, userInfo: LoginUser): Promise<AnimalCreated | ErrorObject<string, number>>;
    findById(id: AnimalCreated['id']): Promise<AnimalCreated | ErrorObject<string, number> | undefined>;
}
