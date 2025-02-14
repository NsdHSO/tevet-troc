import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '@tevet-troc/http-response';

// Define the Header schema
export const HospitalResponse = {
  [HttpCodeW.OK]: Type.Object({ message: Type.String(), code: Type.String() }),
};
