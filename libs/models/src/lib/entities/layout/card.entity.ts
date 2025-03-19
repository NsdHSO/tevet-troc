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

  @Column({nullable: true, default:''})
  icon: string;

  @Column({nullable: true, default:''})
  iconClass: string;

  @Column({
    type: 'enum',
    enum: CardType,
    nullable: true,
    default: CardType.TEXT,
  })
  cardType: CardType;

  @Column({ nullable: true })
  position: number;

  @Column({
    type: 'enum',
    enum: CardSize,
    nullable: true,
    default: CardSize.MEDIUM,
  })
  size: CardSize;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  dataConfig: string; // Example: JSON string storing data configuration for the card

  @ManyToOne(() => DashboardEntity, (dashboard) => dashboard.cards)
  dashboard: DashboardEntity;
}
