import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('inventory')
export class InventoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column()
  itemName: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  unitPrice: number;

  @Column({ nullable: true })
  reorderPoint: number; // The quantity at which to reorder

  @Column({ nullable: true })
  lastReceivedDate: Date;
}
