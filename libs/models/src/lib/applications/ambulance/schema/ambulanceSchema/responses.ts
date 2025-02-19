import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '@tevet-troc/http-response';
import { AmbulanceBody } from './bodies';

// Define the Header schema
export const AmbulanceResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.String(),
    code: Type.String(),
  }),
};
