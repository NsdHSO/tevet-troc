import { ErrorObject } from '../../../infrastructure/models/error';
import { CreatedUser, CreateUser, LoginUser } from './models';
import { HttpCodeW } from '../../../infrastructure/enums/http-code';

export interface IUserHttp {
    register(user: CreateUser): Promise<ErrorObject<CreatedUser, HttpCodeW.OK> | ErrorObject<string, HttpCodeW.Conflict | HttpCodeW.BadRequest>>;

    authenticate(user: LoginUser, refreshToken: string): Promise<CreateUser | undefined>;

    refresh(user: LoginUser): Promise<any | ErrorObject<String, number>>;

    logout(email: string): Promise<{ message: string }>;
}
