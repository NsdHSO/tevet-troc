import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity()
export class StaffScheduleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  staffId: number; // Foreign Key

  @Column()
  departmentId: number; // Foreign Key

  @Column()
  hospitalId: number; // Foreign Key

  @Column({ type: 'date' })
  scheduleDate: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;
}
