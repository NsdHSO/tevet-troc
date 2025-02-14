import { HospitalBodyType } from '../infrastructure/http/schema/hospitalSchema/bodies';

export interface IHospitalHttp {
  create: (payload: Partial<HospitalBodyType>) => Promise<string>;
}
