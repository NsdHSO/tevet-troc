import { IHospitalHttp, IHospitalRepository } from './index';

function createHospital(hospitalRepository: IHospitalRepository) {
  console.log("createHospital", hospitalRepository);
  return hospitalRepository.create;
}

export function hospitalApplicationService(
  hospitalRepository: IHospitalRepository
): IHospitalHttp {
  return {
    create: createHospital(hospitalRepository),
  };
}

