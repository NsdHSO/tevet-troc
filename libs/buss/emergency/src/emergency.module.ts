import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyController } from './emergency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyEntity } from '@app/models';

@Module({
  controllers: [EmergencyController],
  providers: [EmergencyService],
  imports: [TypeOrmModule.forFeature([EmergencyEntity])],
})
export class EmergencyModule {}
