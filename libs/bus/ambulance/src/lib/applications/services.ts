import {
  AmbulanceBodyStatic,
  AmbulanceEntity,
  AmbulanceStatus,
  AmbulanceType,
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
    vehicleNumber: (ambulanceData.vehicleNumber).toUpperCase(), // This is required, no default needed
    model: ambulanceData.model, // This is required, no default needed
    make: ambulanceData.make ?? 'Unknown', // Default if not provided
    year: ambulanceData.year ?? new Date().getFullYear(), // Default to current year
    capacity: ambulanceData.capacity ?? 4, // Default capacity
    type: ambulanceData.type ?? AmbulanceType.BASIC_LIFE_SUPPORT, // Default AmbulanceType
    status: ambulanceData.status ?? AmbulanceStatus.AVAILABLE, // Default AmbulanceStatus
    currentLocationLatitude: ambulanceData.currentLocationLatitude ?? 0,
    currentLocationLongitude: ambulanceData.currentLocationLongitude ?? 0,
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
  };
}
