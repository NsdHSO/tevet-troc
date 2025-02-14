import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Amenities } from '../../enums';

@Entity()
export class AmenityEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
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
