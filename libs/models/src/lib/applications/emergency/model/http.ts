import { EmergencyEntity } from '../../../entities/hospital';
import { EmergencyBodyStatic } from '../schema/emergencySchema';

export interface IEmergencyHttp {
  create(payload: Partial<EmergencyBodyStatic>): Promise<string>;

  getAll(filterBy?: {
    query: Array<keyof EmergencyEntity>;
    filterBy: { [K in keyof Omit<EmergencyEntity, 'id'>]?: any };
  }): Promise<EmergencyEntity[]>;

  update(payload: Partial<EmergencyBodyStatic>): Promise<string>;
}
