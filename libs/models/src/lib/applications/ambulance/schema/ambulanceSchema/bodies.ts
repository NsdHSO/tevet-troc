import { Static, Type } from '@sinclair/typebox';
import {
  AmbulanceStatus,
  Ambulance,
  CarMake,
  CarModel,
} from '../../../../enums';

export const CarSchema = Type.Object({
  make: Type.Enum(CarMake), // e.g., "Mercedes-Benz"
  model: Type.Enum(CarModel), // e.g., "Sprinter"
  year: Type.Integer(), // Manufacturing year
  color: Type.String(),
  mileage: Type.Optional(Type.Number()), // Optional, distance in km/miles
});
// Define the Ambulance schema using TypeBox
export const AmbulanceBodySchema = Type.Object({
  hospitalId: Type.Optional(Type.String()),
  vehicleNumber: Type.String(),
  carDetails: Type.Optional(CarSchema),
  make: Type.Optional(Type.String()), // Optional string
  year: Type.Optional(Type.Number()),
  capacity: Type.Optional(Type.Number()),
  type: Type.Optional(Type.Enum(Ambulance)), // Assuming AmbulanceType is defined elsewhere
  status: Type.Optional(Type.Enum(AmbulanceStatus)), // Assuming AmbulanceStatus is defined elsewhere
  currentLocationLatitude: Type.Optional(Type.Number()),
  currentLocationLongitude: Type.Optional(Type.Number()),
  mission: Type.Optional(Type.String()),
  passengers: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        medicalInfo: Type.String(),
      }),
    ),
  ),
  driverName: Type.Optional(Type.String()),
  driverLicense: Type.Optional(Type.String()),
  lastServiceDate: Type.Optional(Type.String({ format: 'date' })), // Date as string with format
  nextServiceDate: Type.Optional(Type.String({ format: 'date' })), // Date as string with format
  mileage: Type.Optional(Type.Number()),
  fuelType: Type.Optional(Type.String()),
  registrationNumber: Type.Optional(Type.String()),
  insuranceProvider: Type.Optional(Type.String()),
  insuranceExpiryDate: Type.Optional(Type.String({ format: 'date' })), // Date as string with format
  notes: Type.Optional(Type.String()),
});

// Create a TypeBox type from the schema
export type AmbulanceBodyStatic = Static<typeof AmbulanceBodySchema>;
