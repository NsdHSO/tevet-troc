  import { Type, Static } from '@sinclair/typebox';

// Define Hospital Schema
export const HospitalSchema = Type.Object({
  name: Type.Optional(Type.String()),
  address: Type.Optional(Type.String()),
  phone: Type.Optional(Type.String()),
  website: Type.Optional(Type.String({ format: 'uri' })), // Ensures valid URL format
  description: Type.Optional(Type.String()),
  capacity: Type.Optional(Type.Number()),
  established: Type.Optional(Type.Number()),
  ceo: Type.Optional(Type.String()),
  traumaLevel: Type.Optional(Type.String()),
  revenue: Type.Optional(Type.Number()),
  nonProfit: Type.Optional(Type.Boolean()),
  licenseNumber: Type.Optional(Type.String()),
  accreditation: Type.Optional(Type.String()),
  patientSatisfactionRating: Type.Optional(Type.Number({ minimum: 0, maximum: 5 })), // Rating between 0 and 5
  averageStayLength: Type.Optional(Type.Number()),
  annualBudget: Type.Optional(Type.Number()),
  owner: Type.Optional(Type.String()),
  latitude: Type.Optional(Type.Number({ minimum: -90, maximum: 90 })), // Latitude range
  longitude: Type.Optional(Type.Number({ minimum: -180, maximum: 180 })), // Longitude range
});

// Infer TypeScript type from schema
export type HospitalBodyType = Static<typeof HospitalSchema>;
