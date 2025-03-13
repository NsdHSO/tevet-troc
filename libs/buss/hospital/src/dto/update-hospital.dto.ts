import { CreateHospitalDto } from './create-hospital.dto';

export interface UpdateHospitalDto extends Partial<CreateHospitalDto> {}
