import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Amenities } from '../../enums';

@Entity('amenities')
export class AmenityEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'enum',
    enum: Amenities,
    unique: true,
  })
  name: Amenities;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({ nullable: true })
  cost: number;
}
