import { Type } from '@sinclair/typebox';

export const LoginResponses = {
    200: Type.Object({
        accessToken: Type.String(),
    })
}