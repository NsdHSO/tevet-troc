import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../../enums';
import { BaseEntity } from '../base.entity';

@Entity('department')
export class DepartmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column({
    type: 'enum',
    enum: Department,
  })
  name: Department;

  @Column({ nullable: true })
  floor: number;

  @Column({ nullable: true })
  headOfDepartment: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  capacity: number;
}
