import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('patient_doctor')
export class PatientDoctorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  patientId: number; // Foreign Key

  @Column()
  doctorId: number; // Foreign Key

  @Column()
  hospitalId: number; // Foreign Key

  @Column({ type: 'date' })
  assignedDate: Date;

  @Column({ nullable: true })
  notes: string;
}
