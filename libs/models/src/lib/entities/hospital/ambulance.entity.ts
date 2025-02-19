import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { AmbulanceStatus, AmbulanceType } from '../../enums';
import { customAlphabet } from 'nanoid';

@Entity('ambulance')
export class AmbulanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  hospitalId: string; // Foreign key

  @Column({
    unique: true,
    type: 'int',
  })
  ambulanceIc!: string;

  @Column({ unique: true }) // Vehicle number should likely be unique
  vehicleNumber: string;

  @Column()
  model: string;

  @Column({ nullable: true })
  make: string; // Add make of the ambulance

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  capacity: number; // Number of patients it can carry

  @Column({
    type: 'enum',
    enum: AmbulanceType,
    default: AmbulanceType.BASIC_LIFE_SUPPORT,
  })
  type: AmbulanceType;

  @Column({
    type: 'enum',
    enum: AmbulanceStatus,
    default: AmbulanceStatus.AVAILABLE,
  })
  status: AmbulanceStatus;

  @Column({ nullable: true })
  currentLocationLatitude: number;

  @Column({ nullable: true })
  currentLocationLongitude: number;

  @Column({ nullable: true })
  mission: string; // Description of the current mission/task

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  passengers: { name: string; medicalInfo: string }[];

  @Column({ nullable: true })
  driverName: string;

  @Column({ nullable: true })
  driverLicense: string;

  @Column({ nullable: true })
  lastServiceDate: Date; // Add service history

  @Column({ nullable: true })
  nextServiceDate: Date;

  @Column({ nullable: true })
  mileage: number; // Add mileage

  @Column({ nullable: true })
  fuelType: string;

  @Column({ nullable: true })
  registrationNumber: string;

  @Column({ nullable: true })
  insuranceProvider: string;

  @Column({ nullable: true })
  insuranceExpiryDate: Date;

  @Column({ nullable: true })
  notes: string; // Add notes for maintenance or other information

  @BeforeInsert()
  generateId(): void {
    const nanoid = customAlphabet('0123456789', 10);
    this.ambulanceIc = nanoid(); // Generates an 10-character string
  }
}
