import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PaymentStatus } from '../../enums';

@Entity('bill')
export class BillEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  admissionId: number; // Foreign Key

  @Column()
  patientId: number; // Foreign Key

  @Column()
  hospitalId: number; // Foreign Key

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  insuranceCoverage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  patientResponsibility: number;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  lineItems: any;

  @Column({ nullable: true })
  paymentDate: Date;

  @Column({ nullable: true })
  paymentMethod: string;
}
