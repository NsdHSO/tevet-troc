import { Test, TestingModule } from '@nestjs/testing';
import { Buss/emergencyService } from './buss/emergency.service';

describe('Buss/emergencyService', () => {
  let service: Buss/emergencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Buss/emergencyService],
    }).compile();

    service = module.get<Buss/emergencyService>(Buss/emergencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
