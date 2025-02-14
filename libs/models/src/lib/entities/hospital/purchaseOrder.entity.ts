import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { OrderStatus } from '../../enums';

@Entity()
export class PurchaseOrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hospitalId: number; // Foreign Key

  @Column()
  supplierId: number; // Foreign Key

  @Column({ type: 'timestamp' })
  orderDate: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  orderItems: string; // You might want to use a JSON structure for order items

  @Column({ nullable: true })
  totalAmount: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;
}
