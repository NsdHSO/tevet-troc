import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import {
  EmergencyEntity,
  EmergencySeverity,
  EmergencyStatus,
  EmergencyType,
  ReportedBy,
} from '@app/models';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { httpResponseBuilder } from '@app/http-response';

@Injectable()
export class EmergencyService {
  private readonly _loggerService = new Logger(EmergencyService.name);

  constructor(
    @Inject(getRepositoryToken(EmergencyEntity)) // Inject the repository
    private _emergencyRepository: Repository<EmergencyEntity>,
  ) {}

  async create(createEmergencyDto: Partial<CreateEmergencyDto>) {
    const payload = generateEmergencyPayload(createEmergencyDto);
    const emergency = this._emergencyRepository.create(payload);

    try {
      return await this._emergencyRepository
        .save(emergency)
        .then((value) => {
          this._loggerService.log(`Emergency created with ID: ${value.id}`);
          return value;
        })
        .catch((err) => {
          throw `Error creating emergency ${JSON.stringify(err)}`;
        });
    } catch (error) {
      throw httpResponseBuilder.Conflict(error);
    }
  }

  async findAll(params: {
    query?: Array<keyof Omit<CreateEmergencyDto, 'id'>>;
    filterBy?: Record<string, any>;
  }) {
    try {
      const { query, filterBy } = params;

      // Create query builder
      let queryBuilder =
        this._emergencyRepository.createQueryBuilder('emergency');

      // Apply filters if they exist
      if (filterBy && Object.keys(filterBy).length > 0) {
        Object.entries(filterBy).forEach(([key, value]) => {
          // Handle special cases for nested objects like location
          if (key.includes('.')) {
            const [parent, child] = key.split('.');
            queryBuilder = queryBuilder.andWhere(
              `emergency.${parent}->>'${child}' = :${key}`,
              { [key]: value },
            );
          } else {
            queryBuilder = queryBuilder.andWhere(`emergency.${key} = :${key}`, {
              [key]: value,
            });
          }
        });
      }

      // Get results
      const emergencies = await queryBuilder.getMany();

      // Select specific fields if requested
      if (query && query.length > 0) {
        return emergencies.map((emergency) => {
          const selectedObj: any = { id: emergency.id };
          query.forEach((field) => {
            selectedObj[field] = emergency[field as keyof EmergencyEntity];
          });
          return selectedObj;
        });
      }

      return emergencies;
    } catch (error) {
      this._loggerService.error(
        `Error retrieving emergencies: ${JSON.stringify(error)}`,
      );
      throw httpResponseBuilder.InternalServerError(
        'Failed to retrieve emergencies',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} emergency`;
  }

  async update(emergencyIc: string, updateEmergencyDto: UpdateEmergencyDto) {
    try {
      // First find the existing emergency
      const existingEmergency = await this._emergencyRepository.findOne({
        where: { emergencyIc: emergencyIc },
      });

      if (!existingEmergency) {
        throw `Emergency with emergencyIc ${emergencyIc} not found`;
      }

      // Generate the updated payload
      const payload = generateEmergencyPayload({
        ...existingEmergency,
        ...updateEmergencyDto,
      });

      // Update the record - use WHERE criteria in the first parameter
      const result = (await this._emergencyRepository.update(
        { emergencyIc: emergencyIc },
        payload,
      )) as UpdateResult;

      if (result.affected && result.affected > 0) {
        this._loggerService.log(
          `Emergency updated with emergencyIc: ${emergencyIc}`,
        );
        return await this._emergencyRepository.findOne({
          where: { emergencyIc: emergencyIc },
        });
      } else {
        throw `Failed to update emergency with emergencyIc ${emergencyIc}`;
      }
    } catch (error) {
      this._loggerService.error(
        `Error updating emergency: ${JSON.stringify(error)}`,
      );
      throw httpResponseBuilder.Conflict(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} emergency`;
  }
}

function generateEmergencyPayload(overrides: Partial<CreateEmergencyDto>) {
  const defaultPayload = {
    location: {
      latitude: 0.0,
      longitude: 0.0,
    },
    description: 'Not a description',
    status: EmergencyStatus.PENDING,
    severity: EmergencySeverity.UNKNOWN,
    reportedBy: ReportedBy.COMPUTER, // User ID
    ambulance: undefined,
    incidentType: EmergencyType.UNKNOWN,
    notes: '',
    modificationAttempts: [],
  };

  return {
    ...defaultPayload,
    ...overrides,
  } as EmergencyEntity;
}
