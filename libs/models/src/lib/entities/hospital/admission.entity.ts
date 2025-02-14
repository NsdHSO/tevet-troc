import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class AdmissionEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  roomId: number;

  @Column()
  doctorId: number;

  @Column()
  hospitalId: number;

  @Column({ type: 'timestamp' })
  admissionDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  dischargeDate: Date;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalCost: number;

  @Column({ nullable: true })
  admittingDoctorNotes: string;

  @Column({ nullable: true })
  dischargeSummary: string;
}
