import { httpResponseBuilder } from '@app/http-response';
import {
  AmbulanceBodyStatic,
  AmbulanceEntity,
  AmbulanceStatus,
  AmbulanceType,
  CarMake,
  CarModel,
} from '@app/models';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAmbulanceDto } from './dto/update-ambulance.dto';
import { HospitalService } from '@app/hospital';

@Injectable()
export class AmbulanceService {
  private readonly _loggerService = new Logger(AmbulanceService.name);

  constructor(
    @Inject(getRepositoryToken(AmbulanceEntity)) // Inject the repository
    private _ambulanceRepository: Repository<AmbulanceEntity>,
    @Inject(forwardRef(() => HospitalService))
    private readonly _hospitalService: HospitalService,
  ) {}

  async create(
    createAmbulanceDto: Partial<AmbulanceBodyStatic>,
    hospitalName: string,
  ) {
    const hospital = await this._hospitalService.findAll({
      filterBy: { name: hospitalName },
      query: ['id'],
    });
    if (hospital.length === 0) {
      throw httpResponseBuilder.BadRequest('Hospital does not exist');
    }
    const payload = getPrepareForSave(createAmbulanceDto, hospital[0].id + '');
    const createAmbulance = this._ambulanceRepository.create(payload);

    try {
      return await this._ambulanceRepository
        .save(createAmbulance)
        .then(() => httpResponseBuilder.OK('Ambulance created'))
        .catch((e) => {
          throw `Ambulance not created due to database error. ${e}`;
        });
    } catch (error) {
      this._loggerService.error('Unexpected error:', error);
      throw httpResponseBuilder.Conflict(error);
    }
  }

  async findAll(filters?: {
    query: Array<keyof AmbulanceEntity>;
    filterBy: { [K in keyof Omit<AmbulanceEntity, 'id'>]?: any };
  }) {
    try {
      const hospital = await this._hospitalService.findAll({
        filterBy: { name: filters?.filterBy.hospitalId },
        query: ['id'],
      });
      //Check if we have hospital
      if (hospital.length === 0) {
        throw httpResponseBuilder.BadRequest('Hospital does not exist');
      }
      return await this._ambulanceRepository
        .find({
          select: filters?.query,
          where: {
            ...filters?.filterBy,
            hospitalId: hospital[0].id,
          } as any,
        })
        .then((value) => value)
        .catch((e) => {
          throw `Ambulance not Retrieve due to database error. ${e}`;
        });
    } catch (error) {
      throw httpResponseBuilder.InternalServerError(
        `An unexpected error occurred while Retrieve ambulance. ${JSON.stringify(error)}`,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} ambulance`;
  }

  update(id: number, updateAmbulanceDto: UpdateAmbulanceDto) {
    return `This action updates a #${id} ambulance`;
  }

  remove(id: number) {
    return `This action removes a #${id} ambulance`;
  }
}

/**
 * Prepare the payload
 * @param ambulanceData
 * @param hospitalId
 */
function getPrepareForSave(
  ambulanceData: Partial<AmbulanceBodyStatic>,
  hospitalId: string,
): Partial<AmbulanceEntity> {
  return {
    hospitalId: hospitalId,
    vehicleNumber: ambulanceData.vehicleNumber?.toUpperCase() ?? '',
    carDetails: {
      color: ambulanceData.carDetails?.color ?? 'white',
      isAmbulance: true,
      licensePlate: ambulanceData.vehicleNumber?.toUpperCase() ?? '',
      make: ambulanceData.carDetails?.make ?? CarMake.MERCEDES_BENZ,
      mileage: ambulanceData.carDetails?.mileage ?? 0.0,
      model: ambulanceData.carDetails?.model ?? CarModel.SPRINTER,
      year: ambulanceData.year ?? new Date().getFullYear(),
    },
    make: ambulanceData.make ?? 'Unknown',
    year: ambulanceData.year ?? new Date().getFullYear(),
    capacity: ambulanceData.capacity ?? 4,
    type: ambulanceData.type ?? AmbulanceType.BASIC_LIFE_SUPPORT,
    status: ambulanceData.status ?? AmbulanceStatus.AVAILABLE,
    location: {
      latitude: ambulanceData.currentLocationLatitude ?? 0,
      longitude: ambulanceData.currentLocationLongitude ?? 0,
    },
    mission: ambulanceData.mission ?? 'None',
    passengers: ambulanceData.passengers ?? [],
    driverName: ambulanceData.driverName ?? 'Unknown',
    driverLicense: ambulanceData.driverLicense ?? 'Unknown',
    lastServiceDate: (ambulanceData.lastServiceDate ?? new Date()) as Date,
    nextServiceDate: (ambulanceData.nextServiceDate ??
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)) as Date,
    mileage: ambulanceData.mileage ?? 0,
    fuelType: ambulanceData.fuelType ?? 'Gasoline',
    registrationNumber: ambulanceData.registrationNumber ?? 'Unknown',
    insuranceProvider: ambulanceData.insuranceProvider ?? 'Unknown',
    insuranceExpiryDate: (ambulanceData.insuranceExpiryDate ??
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]) as any,
    notes: ambulanceData.notes ?? '',
  };
}
