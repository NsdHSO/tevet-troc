import {
  EmergencyBodyStatic,
  EmergencyEntity,
  EmergencySeverity,
  EmergencyStatus,
  EmergencyType,
  IEmergencyHttp,
  IEmergencyRepository,
} from '@tevet-troc/models';
import { httpResponseBuilder } from '@tevet-troc/http-response';

/**
 * Create Payload to insert in db
 * @param payload
 */
function createPayload(payload: Partial<EmergencyBodyStatic>) {
  if (!payload.description) {
    throw httpResponseBuilder.BadRequest('No description given.');
  }
  return {
    description: payload.description,
    status: payload.status || EmergencyStatus.PENDING,
    severity: payload.severity || EmergencySeverity.UNKNOWN,
    // For reportedBy, you might want to use `null` or a specific number if not provided.
    reportedBy: 1999,
    incidentType: payload.incidentType || EmergencyType.UNKNOWN,
    notes: payload.notes || '',
    location: payload.location || {
      latitude: 0.0,
      longitude: 0.0,
    },
  };
}

export function updatePayload(
  payload: Partial<EmergencyBodyStatic>
): Partial<EmergencyBodyStatic> {
  // Create a copy of the payload to avoid modifying the original
  const updatedPayload: Partial<EmergencyBodyStatic> = { ...payload };

  updatedPayload.status = payload.status || EmergencyStatus.IN_PROGRESS;

  // Handle location updates - ensure both coordinates are present if updating location
  if (updatedPayload.location) {
    if (
      typeof updatedPayload.location.latitude !== 'number' ||
      typeof updatedPayload.location.longitude !== 'number'
    ) {
      throw new Error(
        'Both latitude and longitude must be provided when updating location'
      );
    }
  }

  // Handle ambulance updates - ensure both required fields are present if updating ambulance
  if (updatedPayload.ambulance) {
    if (
      !updatedPayload.ambulance.vehicleNumber ||
      !updatedPayload.ambulance.ambulanceIc
    ) {
      throw new Error(
        'Both vehicleNumber and ambulanceIc must be provided when updating ambulance'
      );
    }
  }

  // You might want to add additional validation or transformation logic here

  return updatedPayload;
}

export function emergencyApplicationService(
  emergencyRepository: IEmergencyRepository
): IEmergencyHttp {
  return {
    async create(payload: Partial<EmergencyBodyStatic>): Promise<string> {
      const localCreatePayload = createPayload(payload);
      return await emergencyRepository.create(localCreatePayload);
    },
    async getAll(): Promise<EmergencyEntity[]> {
      return await emergencyRepository.getAll();
    },
    async update(payload: Partial<EmergencyBodyStatic>): Promise<string> {
      const localUpdatePayload = updatePayload(payload);

      return await emergencyRepository.update(localUpdatePayload);
    },
  };
}
