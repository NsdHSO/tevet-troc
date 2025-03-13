import { Static, Type } from '@sinclair/typebox';
import {
  EmergencySeverity,
  EmergencyStatus,
  EmergencyType,
} from '../../../../enums';

export const EmergencyObject = Type.Object({
  emergencyIc: Type.Optional(Type.String()), // Emergency unique code
  description: Type.Optional(Type.String()), // Description of the emergency
  status: Type.Optional(Type.Enum(EmergencyStatus)), // Status of the emergency
  severity: Type.Optional(Type.Enum(EmergencySeverity)), // Severity of the emergency
  reportedBy: Type.Optional(Type.Number()), // User ID who reported the emergency (optional)
  incidentType: Type.Optional(Type.Enum(EmergencyType)), // Type of emergency (optional)
  notes: Type.Optional(Type.String()), // Any notes (optional)
  location: Type.Optional(
    Type.Object({
      latitude: Type.Number(),
      longitude: Type.Number(),
    }),
  ), // Embedded location details
  ambulance: Type.Optional(
    Type.Object({
      vehicleNumber: Type.String(),
      ambulanceIc: Type.String(),
    }),
  ), // Embedded ambulance details, optional
});

export const EmergencyResponseSchema = Type.Array(EmergencyObject);
export type EmergencyBodyStatic = Static<typeof EmergencyObject>;
