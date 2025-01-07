import { CreatedUser, CreateUser, LoginUser } from '../../../applications';

export interface IUserHttp {
    register(user: CreateUser): Promise<CreatedUser | undefined>;

    authenticate(user: LoginUser): Promise<CreatedUser | undefined>;

    refresh(): Promise<string>;

    logout(): Promise<{ message: string }>;
}
