import { AnimalCreated, CreateAnimal } from './models';
import { LoginUser } from '../../auth/applications';
import { AnimalEntity } from '../infrastructure/dao/animal.entity';

export interface IAnimalRepository {
    create(animal: CreateAnimal): Promise<AnimalCreated>;

    findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined>;

    findAllByUserUic(userUic: LoginUser['uic'], props: {
        query: Array<keyof AnimalEntity>,
        filterBy: { [K in keyof AnimalEntity]?: any }
    }): Promise<AnimalEntity[]>;

    hardFiltering(userUic: LoginUser['uic'], props: {
        query: Array<keyof AnimalEntity>,
        filterBy: { [K in keyof AnimalEntity]?: any }
    }): Promise<AnimalEntity[]>;
}