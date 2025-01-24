import { AnimalCreated, CreateAnimal } from './index';
import { ErrorObject } from '../../../infrastructure/models/error';
import { LoginUser } from '../../auth/applications';
import { HttpCodeW } from '../../../infrastructure/enums/http-code';
import { AnimalEntity } from '../infrastructure/dao/animal.entity';

export interface IAnimalHttp {
    create(animal: CreateAnimal, userInfo: LoginUser): Promise<ErrorObject<AnimalCreated, HttpCodeW.Created> | ErrorObject<string, HttpCodeW.InternalServerError>>;

    findById(id: AnimalCreated['id']): Promise<AnimalCreated | ErrorObject<string, number> | undefined>;

    findAll(userID: LoginUser['uic'], props: {
        query: Array<keyof AnimalEntity>, filterBy: { [K in keyof AnimalEntity]?: any }; // Object with keys as AnimalEntity properties and values as any type
    }): Promise<ErrorObject<AnimalEntity[], HttpCodeW.OK> | ErrorObject<string, HttpCodeW.NotFound | HttpCodeW.NoContent>>;
}
