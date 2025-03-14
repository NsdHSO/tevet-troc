import { AmbulanceEntity } from '@app/models';
import { AmbulanceBodyStatic } from '../schema/ambulanceSchema';

export interface IAmbulanceRepository {
  create(payload: Partial<AmbulanceBodyStatic>): Promise<string>;

  getAll: (filterBy?: {
    query: Array<keyof AmbulanceEntity>;
    filterBy: { [K in keyof Omit<AmbulanceEntity, 'id'>]?: any };
  }) => Promise<Partial<AmbulanceEntity>[]>;
}
