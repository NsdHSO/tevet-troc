import { HttpCodeW } from '@app/http-response';
import { Type } from '@sinclair/typebox';
import { AmbulanceBodySchema } from './bodies';

// Define the Header schema
export const CreateAmbulanceResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.String(),
    code: Type.String(),
  }),
};

export const GetAllAmbulanceResponse = Type.Object({
  message: Type.Object({
    data: Type.Array(AmbulanceBodySchema),
    length: Type.String(),
  }),
  code: Type.String(),
});
