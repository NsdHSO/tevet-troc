import { Type } from '@sinclair/typebox';

export const EmergencyObject = Type.Object({
  emergencyIc: Type.String(), // Emergency unique code
  description: Type.String(), // Description of the emergency
  status: Type.String(), // Status of the emergency
  severity: Type.String(), // Severity of the emergency
  reportedBy: Type.Optional(Type.Number()), // User ID who reported the emergency (optional)
  emergencyType: Type.Optional(Type.String()), // Type of emergency (optional)
  notes: Type.Optional(Type.String()), // Any notes (optional)
  location: Type.Object({
    latitude: Type.Number(),
    longitude: Type.Number(),
  }), // Embedded location details
  ambulance: Type.Optional(
    Type.Object({
      vehicleNumber: Type.String(),
      ambulanceIc: Type.String(),
    })
  ), // Embedded ambulance details, optional
});

export const EmergencyResponseSchema = Type.Array(EmergencyObject);
