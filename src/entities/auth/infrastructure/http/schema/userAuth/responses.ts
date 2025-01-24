import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '../../../../../../infrastructure/enums/http-code';

export const LoginResponses = {
    [HttpCodeW.OK]: Type.Object({
        message: Type.Object({ accessToken: Type.String() })
    })
};