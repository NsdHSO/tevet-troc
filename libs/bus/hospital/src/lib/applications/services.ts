import {
  HospitalEntity,
  IHospitalHttp,
  IHospitalRepository,
  HospitalBodyType
} from '@tevet-troc/models';

function getAllHospital(
  repository: IHospitalRepository,
  filterBy: {
    query: Array<keyof HospitalEntity>;
    filterBy: { [K in keyof Omit<HospitalEntity, 'id'>]?: any };
  }
) {
  return repository.getAll(filterBy);
}

export function hospitalApplicationService(
  hospitalRepository: IHospitalRepository
): IHospitalHttp {
  return {
    create: (payload) => createHospital(hospitalRepository, payload),
    update: (payload) => updateHospital(hospitalRepository, payload),
    getAll: (filterBy) => getAllHospital(hospitalRepository, filterBy),
  };
}

/**
 * Created Logic to send to repository
 * @param hospitalRepository
 * @param payload
 */
function createHospital(
  hospitalRepository: IHospitalRepository,
  payload: Partial<HospitalBodyType>
): Promise<string> {
  return hospitalRepository.create(createPayloadToSavedHospital(payload));
}

/**
 *
 * @param hospitalRepository
 * @param payload
 */
function updateHospital(
  hospitalRepository: IHospitalRepository,
  payload: Partial<HospitalBodyType>
): Promise<string> {
  return hospitalRepository.update(payload);
}

function createPayloadToSavedHospital(
  payload: Partial<HospitalEntity>
): Omit<HospitalEntity, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    accreditation: payload.accreditation ?? '',
    address: payload.address ?? '',
    annualBudget: payload.annualBudget ?? 0,
    averageStayLength: payload.averageStayLength ?? 0,
    capacity: payload.capacity ?? 0,
    ceo: payload.ceo ?? '',
    description: payload.description ?? '',
    established: payload.established ?? 0,
    latitude: payload.latitude ?? 0,
    licenseNumber: payload.licenseNumber ?? '',
    longitude: payload.longitude ?? 0,
    name: payload.name ?? '',
    nonProfit: payload.nonProfit ?? false,
    owner: payload.owner ?? '',
    patientSatisfactionRating: payload.patientSatisfactionRating ?? 0,
    phone: payload.phone ?? '',
    revenue: payload.revenue ?? 0,
    traumaLevel: payload.traumaLevel ?? '',
    website: payload.website ?? '',
  };
}
