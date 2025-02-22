import { EmergencyEntity } from '../../../entities/hospital';

export interface IEmergencyRepository {
  getAll(): Promise<EmergencyEntity[]>;
}
