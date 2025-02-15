import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('hospital')
export class HospitalEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({ nullable: true })
  capacity: number;

  @Column({ nullable: true })
  established: number;

  @Column({ nullable: true })
  ceo: string;

  @Column({ nullable: true })
  traumaLevel: string;

  @Column({ nullable: true })
  revenue: number;

  @Column({ nullable: true })
  nonProfit: boolean;

  @Column({ nullable: true })
  licenseNumber: string;

  @Column({ nullable: true })
  accreditation: string;

  @Column({ nullable: true })
  patientSatisfactionRating: number;

  @Column({ nullable: true })
  averageStayLength: number;

  @Column({ nullable: true })
  annualBudget: number;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;
}
