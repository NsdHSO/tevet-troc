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
      const { query, filterBy = {} } = params;

      const pageSize = Number(filterBy.pageSize ?? 10);
      const page = Number(filterBy.page ?? 1);

      if (pageSize < 0 || page < 0) {
        throw httpResponseBuilder.BadRequest('Pagination is not valid');
      }

      // Remove pagination keys from filters
      const { pageSize: _, page: __, ...actualFilters } = filterBy;

      let queryBuilder = this._emergencyRepository.createQueryBuilder('emergency');

      // Apply filters
      for (const [key, value] of Object.entries(actualFilters)) {
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
      }

      queryBuilder.skip((page - 1) * pageSize).take(pageSize);

      const [emergencies, total] = await queryBuilder.getManyAndCount();

      if (query && query.length > 0) {
        const selected = emergencies.map((e) => {
          const partial: any = { id: e.id };
          query.forEach((field) => {
            partial[field] = e[field as keyof typeof e];
          });
          return partial;
        });

        return { data: selected, length: total };
      }

      return { data: emergencies, length: total };
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
