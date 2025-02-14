import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class PrescriptionEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  patientId: number; // Foreign Key

  @Column()
  doctorId: number; // Foreign Key

  @Column()
  hospitalId: number; // Foreign Key

  @Column()
  medication: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;
}
