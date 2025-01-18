import { CreatedUser, CreateUser, LoginUser } from '../../../applications';

export interface IUserHttp {
    register(user: CreateUser): Promise<CreatedUser | undefined>;

    authenticate(user: LoginUser): Promise<CreateUser | undefined>;

    refresh(user: LoginUser): Promise<{ accessToken: string, refreshToken: string }>;

    logout(): Promise<{ message: string }>;
}
