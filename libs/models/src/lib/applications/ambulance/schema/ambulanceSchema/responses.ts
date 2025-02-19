import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '@tevet-troc/http-response';
import { AmbulanceBodySchema } from './bodies';

// Define the Header schema
export const CreateAmbulanceResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.String(),
    code: Type.String(),
  }),
};

export const GetAllAmbulanceResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.Array(AmbulanceBodySchema),
    code: Type.String(),
  }),
};
