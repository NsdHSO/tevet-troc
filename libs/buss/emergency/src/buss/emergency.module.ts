import { Module } from '@nestjs/common';
import { Buss/emergencyService } from './buss/emergency.service';

@Module({
  providers: [Buss/emergencyService],
  exports: [Buss/emergencyService],
})
export class Buss/emergencyModule {}
