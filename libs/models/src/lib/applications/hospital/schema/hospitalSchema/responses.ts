import { Static, Type } from '@sinclair/typebox';
import { HospitalSchema } from './bodies';

export const AllHospital = Type.Array(HospitalSchema);

// Extract the JSON schema definition
export const hospitalAllResponseSchema = Type.Object({
  message: AllHospital,
  code: Type.String(),
});
export const hospitalResponseSchema = Type.Object({
  message: HospitalSchema,
  code: Type.String(),
});

// Create a type for the response body.
export type HospitalAllType = Static<typeof AllHospital>;
