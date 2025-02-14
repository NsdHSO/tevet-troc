import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { AppointmentStatus } from '../../enums';

@Entity()
export class AppointmentEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientId: number;

  @Column()
  doctorId: number;

  @Column()
  hospitalId: number;

  @Column({ type: 'timestamp' })
  appointmentDate: Date;

  @Column({ type: 'enum', enum: AppointmentStatus })
  status: AppointmentStatus;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column({ nullable: true })
  scheduledBy: string;

  @Column({ nullable: true })
  appointmentType: string;
}
