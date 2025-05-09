import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Bed } from '../../enums';

@Entity('bed')
export class BedEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  roomId: number; // Foreign Key

  @Column({
    type: 'enum',
    enum: Bed,
  })
  type: Bed;

  @Column({ nullable: true })
  isOccupied: boolean;
}
