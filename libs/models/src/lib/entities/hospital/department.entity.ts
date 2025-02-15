import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DepartmentType } from '../../enums';
import { BaseEntity } from '../base.entity';

@Entity('department')
export class DepartmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column({
    type: 'enum',
    enum: DepartmentType,
  })
  name: DepartmentType;

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
