import { CreatedUser, CreateUser, LoginUser } from '../../../applications';

export interface IUserHttp {
    register(user: CreateUser): Promise<CreatedUser | undefined>;

    authenticate(user: LoginUser): Promise<CreateUser | undefined>;

    refresh(): Promise<string>;

    logout(): Promise<{ message: string }>;
}
