import { EmergencyEntity } from '../../../entities/hospital';
import { EmergencyBodyStatic } from '../schema/emergencySchema';

export interface IEmergencyRepository {
  getAll(filterBy?: {
    query: Array<keyof EmergencyEntity>;
    filterBy: { [K in keyof Omit<EmergencyEntity, 'id'>]?: any };
  }): Promise<EmergencyEntity[]>;

  create(payload: Partial<EmergencyBodyStatic>): Promise<string>;

  update(payload: Partial<EmergencyBodyStatic>): Promise<string>;
}
