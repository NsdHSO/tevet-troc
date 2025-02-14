import { HospitalEntity } from '@tevet-troc/models';

export interface IHospitalRepository {
  create: (payload: Partial<HospitalEntity>) => Promise<string>;
}
