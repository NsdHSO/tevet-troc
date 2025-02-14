import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
@Entity()
export class MedicalRecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  patientId: number; // Foreign Key

  @Column()
  hospitalId: number; // Foreign Key

  @Column({ type: 'text', nullable: true })
  recordData: string; // Store medical record data (consider using a more structured format like JSON)

  @Column({ type: 'timestamp', nullable: true })
  recordDate: Date;
}
