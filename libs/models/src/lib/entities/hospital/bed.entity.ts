import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { BedType } from '../../enums';

@Entity()
export class BedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number; // Foreign Key

  @Column({
    type: 'enum',
    enum: BedType,
  })
  type: BedType;

  @Column({ nullable: true })
  isOccupied: boolean;
}
