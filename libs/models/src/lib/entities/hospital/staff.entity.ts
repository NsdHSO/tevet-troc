import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { StaffRole } from '../../enums';

@Entity()
export class StaffEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column()
  departmentId: number; // Foreign Key

  @Column()
  name: string;

  @Column({ type: 'enum', enum: StaffRole })
  role: StaffRole;

  @Column({ nullable: true })
  specialization: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;
}
