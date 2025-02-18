import { HospitalBodyType } from '../schema/hospitalSchema/bodies';
import { HospitalEntity } from '../../../entities/hospital';

export interface IHospitalHttp {
  create: (payload: Partial<HospitalBodyType>) => Promise<string>;
  update: (payload: Partial<HospitalBodyType>) => Promise<string>;
  getAll: (filterBy: {
    query: Array<keyof Omit<HospitalEntity, 'id'>>;
    filterBy: { [K in keyof Omit<HospitalEntity, 'id'>]?: any };
  }) => Promise<Omit<Partial<HospitalEntity>, 'id'>[]>;
}
