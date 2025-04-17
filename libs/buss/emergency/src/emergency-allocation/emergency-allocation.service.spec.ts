import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyAllocationService } from './emergency-allocation.service';

describe('EmergencyAllocationService', () => {
  let service: EmergencyAllocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyAllocationService],
    }).compile();

    service = module.get<EmergencyAllocationService>(EmergencyAllocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
