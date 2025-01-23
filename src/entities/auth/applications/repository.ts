import { CreatedUser, CreateUser } from './models';
import { UserEntity } from '../infrastructure/dao/user.entity';
import { UpdateResult } from 'typeorm';

export interface IUserRepository {
    create(user: CreateUser): Promise<CreatedUser | undefined>;

    findByEmail(email: string): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity | undefined>;
    update(user:UserEntity): Promise<UpdateResult>;
}
