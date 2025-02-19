import { HospitalEntity } from '../../../entities/hospital';

export interface IHospitalRepository {
  create: (payload: Partial<HospitalEntity>) => Promise<string>;
  update: (payload: Partial<HospitalEntity>) => Promise<string>;
  getAll: (filter: {
    query: Array<keyof HospitalEntity>;
    filterBy: { [K in keyof Omit<HospitalEntity, 'id'>]?: any };
  }) => Promise<Partial<HospitalEntity>[]>;
}
