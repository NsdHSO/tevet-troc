import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreatedUser, CreateUser, IUserRepository } from '../../applications';

export default function (db: Repository<UserEntity>): IUserRepository {
    return {
        findByEmail(email: string): Promise<CreatedUser | undefined> {
            return Promise.resolve(undefined);
        },
        create(user: CreateUser): Promise<CreatedUser | undefined> {
            return Promise.resolve(undefined);
        }
    };
}