import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patientInfo')
export class PatientInfoEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ nullable: true })
  name?: string;

  @Column({ type: 'text', nullable: true })
  medicalInfo?: string;
  }
