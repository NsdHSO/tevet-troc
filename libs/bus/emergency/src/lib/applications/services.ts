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
  if (!payload.description){
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
  };
}
