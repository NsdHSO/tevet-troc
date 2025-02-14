import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoomType } from '../../enums';
import { BaseEntity } from '../base.entity';

@Entity()
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column({
    type: 'enum',
    enum: RoomType,
  })
  type: RoomType;

  @Column({ nullable: true })
  roomNumber: string;

  @Column({ nullable: true })
  ratePerDay: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({ nullable: true })
  floor: number;

  @Column({ nullable: true })
  view: string;
}
