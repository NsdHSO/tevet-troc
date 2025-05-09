import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '../../enums';
import { BaseEntity } from '../base.entity';

@Entity('room')
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column({
    type: 'enum',
    enum: Room,
  })
  type: Room;

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
