import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';

@Module({
  providers: [EmergencyService],
  exports: [EmergencyService],
})
export class EmergencyModule {}
