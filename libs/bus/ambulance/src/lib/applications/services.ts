import {
  AmbulanceBodyStatic,
  AmbulanceEntity,
  AmbulanceStatus,
  AmbulanceType,
  CarMake,
  CarModel,
  IAmbulanceHttp,
  IAmbulanceRepository,
  IHospitalHttp,
} from '@tevet-troc/models';
import { httpResponseBuilder } from '@tevet-troc/http-response';

/**
 * Prepare the payload
 * @param ambulanceData
 * @param hospitalId
 */
function getPrepareForSave(
  ambulanceData: Partial<AmbulanceBodyStatic>,
  hospitalId: string
): Partial<AmbulanceEntity> {
  return {
    hospitalId: hospitalId, // This is required, no default needed
    vehicleNumber: ambulanceData.vehicleNumber.toUpperCase(), // This is required, no default needed
    carDetails: {
      color: ambulanceData.carDetails.color ?? 'white',
      isAmbulance: true,
      licensePlate: ambulanceData.vehicleNumber.toUpperCase() ?? '',
      make: ambulanceData.carDetails.make ?? CarMake.MERCEDES_BENZ,
      mileage: ambulanceData.carDetails.mileage ?? 0.0,
      model: ambulanceData.carDetails.model ?? CarModel.SPRINTER,
      year: ambulanceData.year ?? new Date().getFullYear(),
    },
    make: ambulanceData.make ?? 'Unknown', // Default if not provided
    year: ambulanceData.year ?? new Date().getFullYear(), // Default to current year
    capacity: ambulanceData.capacity ?? 4, // Default capacity
    type: ambulanceData.type ?? AmbulanceType.BASIC_LIFE_SUPPORT, // Default AmbulanceType
    status: ambulanceData.status ?? AmbulanceStatus.AVAILABLE, // Default AmbulanceStatus
    location: {
      latitude: ambulanceData.currentLocationLatitude ?? 0,
      longitude: ambulanceData.currentLocationLongitude ?? 0,
    },
    mission: ambulanceData.mission ?? 'None',
    passengers: ambulanceData.passengers ?? [],
    driverName: ambulanceData.driverName ?? 'Unknown',
    driverLicense: ambulanceData.driverLicense ?? 'Unknown',
    lastServiceDate: (ambulanceData.lastServiceDate ?? new Date()) as Date, // Today's date
    nextServiceDate: (ambulanceData.nextServiceDate ??
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)) as Date, // One year from now
    mileage: ambulanceData.mileage ?? 0,
    fuelType: ambulanceData.fuelType ?? 'Gasoline',
    registrationNumber: ambulanceData.registrationNumber ?? 'Unknown',
    insuranceProvider: ambulanceData.insuranceProvider ?? 'Unknown',
    insuranceExpiryDate: (ambulanceData.insuranceExpiryDate ??
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]) as any, // One year from now
    notes: ambulanceData.notes ?? '',
  };
}

async function getAllAmbulance(
  repository: IAmbulanceRepository,
  hospitalService: IHospitalHttp,
  filterBy: {
    query: Array<keyof AmbulanceEntity>;
    filterBy: { [K in keyof Omit<AmbulanceEntity, 'id'>]?: any };
  }
): Promise<Partial<AmbulanceEntity>[] | string> {
  const hospital = await hospitalService.getAll({
    filterBy: { name: filterBy.filterBy.hospitalId },
    query: ['id'],
  });

  if (!hospital) {
    return 'Hospital not found';
  }

  const localFilter = {
    ...filterBy,
    filterBy: {
      ...filterBy.filterBy,
      hospitalId: hospital[0].id,
    },
  };
  return await repository.getAll(localFilter);
}

export function ambulanceApplicationService(
  ambulanceRepository: IAmbulanceRepository
): IAmbulanceHttp {
  return {
    async create(
      hospitalService: IHospitalHttp,
      payload: Partial<AmbulanceBodyStatic>
    ): Promise<string> {
      const hospital = await hospitalService.getAll({
        filterBy: { name: payload.hospitalName },
        query: ['id'],
      });
      //Check if we have hospital
      if (hospital.length === 0) {
        throw httpResponseBuilder.BadRequest('Hospital does not exist');
      }
      const prepareForSave = getPrepareForSave(
        payload,
        hospital[0].id.toString()
      );

      return ambulanceRepository.create(prepareForSave as any);
    },
    getAll: (hospitalService: IHospitalHttp, filterBy) =>
      getAllAmbulance(ambulanceRepository, hospitalService, filterBy),
  };
}
