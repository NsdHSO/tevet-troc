import { CreatedUser, CreateUser } from './models';

export interface IUserRepository{
    create(user: CreateUser): Promise<CreatedUser | undefined>;
    findByEmail(email: string): Promise<CreatedUser | undefined>;

}
