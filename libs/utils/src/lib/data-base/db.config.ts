import { AdmissionEntity, AmbulanceEntity, AmenityEntity, AppointmentEntity, BedEntity, BillEntity, DepartmentEntity, GuardEntity, HospitalEntity, InventoryEntity, MedicalRecordEntity, PatientDoctorEntity, PatientEntity, PrescriptionEntity, PurchaseOrderEntity, RoomEntity, StaffEntity, StaffScheduleEntity, SupplierEntity, TreatmentEntity } from '@tevet-troc/models';


import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: process.env.NODE_ENV_DB === 'dev',
  logging: process.env.NODE_ENV === 'dev',
  subscribers: [],
  migrationsRun: process.env.NODE_ENV !== 'dev',
  entities: [AdmissionEntity, AmbulanceEntity, AmenityEntity, AppointmentEntity, BedEntity, BillEntity, DepartmentEntity, GuardEntity, HospitalEntity, InventoryEntity, MedicalRecordEntity, PatientDoctorEntity, PatientEntity, PrescriptionEntity, PurchaseOrderEntity, RoomEntity, StaffEntity, StaffScheduleEntity, SupplierEntity, TreatmentEntity],
  logger: 'debug',
});

export async function registerDb(fastify: FastifyInstance) {
  fastify.log.info('registerDb Function database...');
  await dataSource.initialize();
  fastify.decorate('orm', dataSource as any);
}
