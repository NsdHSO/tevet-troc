import { AmbulanceBodyStatic } from '../schema/ambulanceSchema';
import { AmbulanceEntity } from '../../../entities/hospital/ambulance.entity';
import { IHospitalHttp } from '../../hospital';

export interface IAmbulanceHttp {
  create: (
    hospitalService: IHospitalHttp,
    payload: Partial<AmbulanceBodyStatic>,
  ) => Promise<string>;
  getAll: (
    hospitalService: IHospitalHttp,
    filterBy?: {
      query: Array<keyof AmbulanceEntity>;
      filterBy: { [K in keyof Omit<AmbulanceEntity, 'id'>]?: any };
    },
  ) => Promise<Partial<AmbulanceEntity>[] | string>;
}
