import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('patient')
export class PatientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ nullable: true })
  bloodType: string;

  @Column({ type: 'text', array: true, nullable: true })
  allergies: string[];

  @Column({ type: 'text', nullable: true })
  medicalHistory: string;
}
