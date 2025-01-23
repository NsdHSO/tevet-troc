import { Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreatedUser, CreateUser, IUserRepository } from '../../applications/http';

export default function (db: Repository<UserEntity>): IUserRepository {
    return {
        async findByEmail(email: string): Promise<UserEntity | null> {
            return await db.findOneBy({ email });
        },
        async create(user: CreateUser): Promise<CreatedUser | undefined> {
            const entityUser = db.create(user);
            try {
                return await db.save(entityUser).then(user => ({
                    email: user.email,
                    roles: user.roles,
                    username: user.username
                } as CreatedUser));
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async save(user: UserEntity): Promise<UserEntity | undefined> {
            return await db.save(user);
        },
        async update(user): Promise<UpdateResult> {
            return await db.update({ email: user.email }, {});
        }
    };
}