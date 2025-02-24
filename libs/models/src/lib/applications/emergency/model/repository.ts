import { EmergencyEntity } from '../../../entities/hospital';
import { EmergencyBodyStatic } from '../schema/emergencySchema';

export interface IEmergencyRepository {
  getAll(): Promise<EmergencyEntity[]>;

  create(payload: Partial<EmergencyBodyStatic>): Promise<string>;
}
