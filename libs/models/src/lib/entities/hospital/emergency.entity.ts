import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { AmbulanceEntity } from './ambulance.entity';
import { customAlphabet } from 'nanoid';
import { LocationEntity } from './location.entity';

@Entity('emergency')
export class EmergencyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column(() => LocationEntity, { prefix: 'emergency' })
  location: LocationEntity;

  @Column({ type: 'text' })
  emergencyIc: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  severity: string;

  @Column({ nullable: true })
  reportedBy?: number; // User ID

  @ManyToOne(() => AmbulanceEntity, { nullable: true })
  @JoinColumn({ name: 'idAmbulance' })
  ambulance?: AmbulanceEntity;

  @Column({ nullable: true })
  emergencyType?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes?: string;

  @BeforeInsert()
  generateId(): void {
    const nanoid = customAlphabet('0123456789', 10);
    this.emergencyIc = nanoid(); // Generates an 10-character string
  }
}
