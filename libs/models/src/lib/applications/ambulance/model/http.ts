import { IHospitalHttp } from '../../hospital';
import { AmbulanceBodyStatic } from '../schema/ambulanceSchema';

export interface IAmbulanceHttp {
  create: (
    hospitalService: IHospitalHttp,
    payload: Partial<AmbulanceBodyStatic>
  ) => Promise<string>;
}
