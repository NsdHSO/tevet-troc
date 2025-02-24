import { Type } from '@sinclair/typebox';
import { HttpCodeW } from '@tevet-troc/http-response';
import { EmergencyResponseSchema } from './bodies';

// Define the Header schema
export const EmergencyResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: EmergencyResponseSchema,
    code: Type.String(),
  }),
};
export const CreatedEmergencyResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.String(),
    code: Type.String(),
  }),
};
