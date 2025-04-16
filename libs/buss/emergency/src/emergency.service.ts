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
import { Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all emergency`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emergency`;
  }

  update(id: number, updateEmergencyDto: UpdateEmergencyDto) {
    return `This action updates a #${id} emergency`;
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
