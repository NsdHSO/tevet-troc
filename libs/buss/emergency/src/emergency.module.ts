import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyController } from './emergency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmbulanceEntity, EmergencyEntity } from '@app/models';
import { EmergencyAllocationService } from './emergency-allocation/emergency-allocation.service';

@Module({
  controllers: [EmergencyController],
  providers: [EmergencyService, EmergencyAllocationService],
  imports: [TypeOrmModule.forFeature([EmergencyEntity, AmbulanceEntity])],
})
export class EmergencyModule {}
