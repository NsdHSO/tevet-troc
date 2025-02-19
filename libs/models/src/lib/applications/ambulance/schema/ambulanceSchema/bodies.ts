import { Static, Type } from '@sinclair/typebox';
import { AmbulanceStatus, AmbulanceType } from '../../../../enums';

// Define the Ambulance schema using TypeBox
export const AmbulanceBody = Type.Object({
  hospitalName: Type.String(),
  vehicleNumber: Type.String(),
  model: Type.String(),
  make: Type.Optional(Type.String()), // Optional string
  year: Type.Optional(Type.Number()),
  capacity: Type.Optional(Type.Number()),
  type: Type.Optional(Type.Enum(AmbulanceType)), // Assuming AmbulanceType is defined elsewhere
  status: Type.Optional(Type.Enum(AmbulanceStatus)), // Assuming AmbulanceStatus is defined elsewhere
  currentLocationLatitude: Type.Optional(Type.Number()),
  currentLocationLongitude: Type.Optional(Type.Number()),
  mission: Type.Optional(Type.String()),
  passengers: Type.Optional(
    Type.Array(
      Type.Object({
        name: Type.String(),
        medicalInfo: Type.String(),
      })
    )
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
export type AmbulanceBodyStatic = Static<typeof AmbulanceBody>;
