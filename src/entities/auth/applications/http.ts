import { ErrorObject } from '../../../infrastructure/models/error';
import { CreatedUser, CreateUser, LoginUser } from './models';

export interface IUserHttp {
    register(user: CreateUser): Promise<CreatedUser | undefined>;

    authenticate(user: LoginUser, refreshToken: string): Promise<CreateUser | undefined>;

    refresh(user: LoginUser): Promise<any | ErrorObject<String, number>>;

    logout(email: string): Promise<{ message: string }>;
}
