import { Static, Type } from '@sinclair/typebox';

export const UserCreate = Type.Object({
    username: Type.String(),
    password: Type.String(),
    email: Type.String({ format: 'email' }),
});

export const LoginUser = Type.Object({
    password: Type.String(),
    email: Type.String({ format: 'email' }),
});
export type LoginUserType = Static<typeof LoginUser>;
export type UserCreateType = Static<typeof UserCreate>