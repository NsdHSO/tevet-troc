import { Static, Type } from '@sinclair/typebox';
import { HttpCodeW } from '@tevet-troc/http-response';
import { HospitalSchema } from './bodies';

// Define the Header schema
export const HospitalResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: Type.String(),
    code: Type.String(),
  }),
};

export const AllHospital = Type.Array(HospitalSchema);

// Define the Header schema
export const HospitalAllResponse = {
  [HttpCodeW.OK]: Type.Object({
    message: AllHospital,
    code: Type.String(),
  }),
};
export type HospitalAllType = Static<typeof AllHospital>;
