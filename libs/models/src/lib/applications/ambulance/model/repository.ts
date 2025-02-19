import { AmbulanceBodyStatic } from '../schema/ambulanceSchema';

export interface IAmbulanceRepository {
  create(payload: Partial<AmbulanceBodyStatic>): Promise<string>;
}
