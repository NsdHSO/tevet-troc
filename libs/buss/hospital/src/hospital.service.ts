import { Inject, Injectable } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HospitalEntity } from '@app/models';
import { Repository } from 'typeorm';
import { httpResponseBuilder } from '@app/http-response';

@Injectable()
export class HospitalService {
  constructor(
    @Inject(getRepositoryToken(HospitalEntity)) // Inject the repository
    private hospitalRepository: Repository<HospitalEntity>,
  ) {}

  async create(createHospitalDto: CreateHospitalDto) {
    const payload = createPayloadToSavedHospital(createHospitalDto);
    try {
      const hospital = this.hospitalRepository.create(payload);
      return await this.hospitalRepository
        .save(hospital)
        .then(() => 'Hospital created')
        .catch((err) => {
          throw `Hospital not created due to database error. ${err}`;
        });
    } catch (error) {
      console.error('Unexpected error:', error);
      throw httpResponseBuilder.Conflict(error);
    }
  }

  async findAll(filters?: {
    query?: Array<keyof HospitalEntity>;
    filterBy?: { [K in keyof HospitalEntity]?: any };
  }) {
    try {
      return await this.hospitalRepository
        .find({
          select: filters?.query,
          where: { ...filters?.filterBy },
        })
        .then((value) => value)
        .catch((e) => {
          throw `Hospital not updated due to database error. ${e}`;
        });
    } catch (error) {
      throw httpResponseBuilder.InternalServerError(
        `An unexpected error occurred while updating hospital. ${error}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const hospitals = await this.hospitalRepository.find().catch((e) => {
        throw `Hospital not found due to database error. ${e}`;
      });

      if (hospitals.length > 0) {
        return hospitals.filter((hospital) =>
          hospital.name.toLowerCase().includes(id.toLowerCase()),
        );
      }
      return [];
    } catch (error) {
      throw httpResponseBuilder.InternalServerError(`Error ${error}`);
    }
  }

  async update(updateHospitalDto: UpdateHospitalDto) {
    if (!updateHospitalDto.name) {
      throw 'Please provide a name';
    }
    try {
      const hospital = await this.hospitalRepository.findOneBy({
        name: updateHospitalDto.name,
      }); // Find hospital by ID

      if (!hospital) {
        return 'Hospital not found.'; // Handle not found case
      }

      // Update the hospital properties with the payload values (only if they exist in payload)
      for (const key in updateHospitalDto) {
        if (Object.prototype.hasOwnProperty.call(updateHospitalDto, key)) {
          hospital[key] = updateHospitalDto[key];
        }
      }

      return await this.hospitalRepository
        .save(hospital)
        .then(() => httpResponseBuilder.OK('Hospital updated'))
        .catch(() => {
          throw 'Hospital not updated due to database error.';
        });
    } catch (error) {
      console.error('Error updating hospital:', error);

      if (error instanceof httpResponseBuilder.NotFound) {
        throw error; // Re-throw NotFound errors
      } else if (
        error instanceof Error &&
        error.message.includes('database error')
      ) {
        throw httpResponseBuilder.InternalServerError(
          'Database error occurred while updating hospital.',
        );
      } else {
        throw httpResponseBuilder.InternalServerError(
          'An unexpected error occurred while updating hospital.',
        );
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} hospital`;
  }
}

function createPayloadToSavedHospital(
  payload: Partial<HospitalEntity>,
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
