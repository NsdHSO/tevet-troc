import { AnimalCreated, CreateAnimal } from './models';
import { ErrorObject } from '../../../infrastructure/models/error';
import { LoginUser } from '../../auth/applications';
import { AnimalEntity } from '../infrastructure/dao/animal.entity';

export interface IAnimalRepository {
    create(animal: CreateAnimal): Promise<AnimalCreated>;
    findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined>;
    findAllByUserUic(userUic: LoginUser['uic'],  props:{query:Array<keyof AnimalEntity>}): Promise<AnimalEntity[]>;
}