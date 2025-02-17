import { HospitalEntity } from '@tevet-troc/models';

export interface IHospitalRepository {
  create: (payload: Partial<HospitalEntity>) => Promise<string>;
  update: (payload: Partial<HospitalEntity>) => Promise<string>;
  getAll: (filter: {
    query: Array<keyof Omit<HospitalEntity, 'id'>>;
    filterBy: { [K in keyof Omit<HospitalEntity, 'id'>]?: any };
  }) => Promise<Omit<Partial<HospitalEntity>, 'id'>[]>;
}
