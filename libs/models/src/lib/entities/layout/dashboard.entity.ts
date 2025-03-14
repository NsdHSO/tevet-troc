import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@app/models/lib/entities/base.entity';
import { CardEntity } from '@app/models/lib/entities/layout/card.entity';

@Entity('dashboard')
export class DashboardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    unique: true,
    type: 'text',
  })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  ownerId: number; // Example: ID of the user who owns the dashboard

  @Column({ nullable: true })
  layoutConfig: string; // Example: JSON string storing layout configuration

  @OneToMany(() => CardEntity, (card) => card.dashboard)
  cards: CardEntity[];
}
