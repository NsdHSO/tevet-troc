import { Static, Type } from '@sinclair/typebox';

export const UserCreate = Type.Object({
    username: Type.String(),
    password: Type.String(),
    email: Type.String({ format: 'email' }),
});

export type UserCreateType = Static<typeof UserCreate>