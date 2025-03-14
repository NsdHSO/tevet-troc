import { BaseEntity } from '@app/models/lib/entities/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DashboardEntity } from '@app/models/lib/entities/layout/dashboard.entity';
import { CardSize, CardType } from '@app/models';

@Entity('card')
export class CardEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: CardType,
    nullable: true,
  })
  cardType: CardType;

  @Column({ nullable: true })
  position: number;

  @Column({
    type: 'enum',
    enum: CardSize,
    nullable: true,
  })
  size: CardSize;

  @Column({ nullable: true })
  dataConfig: string; // Example: JSON string storing data configuration for the card

  @ManyToOne(() => DashboardEntity, (dashboard) => dashboard.cards)
  dashboard: DashboardEntity;
}
