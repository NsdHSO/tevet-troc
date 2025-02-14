import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { GuardArea, GuardShift } from '../../enums';

@Entity()
export class GuardEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: GuardShift,
  })
  shift: GuardShift;

  @Column({
    type: 'enum',
    enum: GuardArea,
  })
  area: GuardArea;

  @Column({ nullable: true })
  employeeId: string;
}
