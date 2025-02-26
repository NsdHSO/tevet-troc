import { EmergencyEntity } from '../../../entities/hospital';
import { EmergencyBodyStatic } from '../schema/emergencySchema';

export interface IEmergencyHttp {
  create(payload: Partial<EmergencyBodyStatic>): Promise<string>;

  getAll(): Promise<EmergencyEntity[]>;

  update(payload: Partial<EmergencyBodyStatic>): Promise<string>;
}
