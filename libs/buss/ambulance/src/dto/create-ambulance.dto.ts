import { AmbulanceBodyStatic } from '@app/models';

export interface CreateAmbulanceDto extends Partial<AmbulanceBodyStatic> {
  hospitalId: string;
}
