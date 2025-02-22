import { EmergencyEntity } from '../../../entities/hospital';

export interface IEmergencyHttp {
  getAll(): Promise<EmergencyEntity[]>;
}
