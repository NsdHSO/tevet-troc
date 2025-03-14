import {
  AdmissionEntity,
  AmbulanceEntity,
  AmenityEntity,
  AppointmentEntity,
  BedEntity,
  BillEntity,
  CardEntity,
  DashboardEntity,
  DepartmentEntity,
  EmergencyEntity,
  GuardEntity,
  HospitalEntity,
  InventoryEntity,
  MedicalRecordEntity,
  PatientDoctorEntity,
  PatientEntity,
  PatientInfoEntity,
  PrescriptionEntity,
  PurchaseOrderEntity,
  RoomEntity,
  StaffEntity,
  StaffScheduleEntity,
  SupplierEntity,
  TreatmentEntity,
} from '@app/models'; // Assuming @app/models is your entities location
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure ConfigModule is imported and configured
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        synchronize: configService.get<string>('NODE_ENV_DB') === 'dev',
        logging: configService.get<string>('NODE_ENV') === 'dev',
        entities: [
          AdmissionEntity,
          AmbulanceEntity,
          AmenityEntity,
          AppointmentEntity,
          BedEntity,
          BillEntity,
          DepartmentEntity,
          DashboardEntity,
          CardEntity,
          EmergencyEntity,
          GuardEntity,
          HospitalEntity,
          InventoryEntity,
          MedicalRecordEntity,
          PatientDoctorEntity,
          PatientEntity,
          PatientInfoEntity,
          PrescriptionEntity,
          PurchaseOrderEntity,
          RoomEntity,
          StaffEntity,
          StaffScheduleEntity,
          SupplierEntity,
          TreatmentEntity,
        ],
        migrationsRun: configService.get<string>('NODE_ENV') !== 'dev',
        logger: 'advanced-console',
      }),
    }),
  ],
})
export class DatabaseModule {}
