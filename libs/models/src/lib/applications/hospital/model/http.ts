import { HospitalBodyType } from '../schema/hospitalSchema';
import { HospitalEntity } from '../../../entities/hospital';

export interface IHospitalHttp {
  create: (payload: Partial<HospitalBodyType>) => Promise<string>;
  update: (payload: Partial<HospitalBodyType>) => Promise<string>;
  getAll: (filterBy?: {
    query: Array<keyof HospitalEntity>;
    filterBy: { [K in keyof Omit<HospitalEntity, 'id'>]?: any };
  }) => Promise<Partial<HospitalEntity>[]>;
}
