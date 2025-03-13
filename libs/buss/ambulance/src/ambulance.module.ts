import { AmbulanceEntity } from '@app/models';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmbulanceController } from './ambulance.controller';
import { AmbulanceService } from './ambulance.service';
import { HospitalModule } from '@app/hospital';

@Module({
  imports: [
    TypeOrmModule.forFeature([AmbulanceEntity]),
    forwardRef(() => HospitalModule),
  ],
  controllers: [AmbulanceController],
  providers: [AmbulanceService],
})
export class AmbulanceModule {}
