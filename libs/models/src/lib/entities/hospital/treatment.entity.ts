import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class TreatmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  admissionId: number; // Foreign Key

  @Column()
  doctorId: number; // Foreign Key

  @Column()
  hospitalId: number; // Foreign Key

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  treatmentDate: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  cost: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;
}
