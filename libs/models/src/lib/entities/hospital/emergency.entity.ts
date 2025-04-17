import {
  BeforeInsert,
  BeforeUpdate,
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
import { EmergencySeverity, EmergencyStatus, EmergencyType } from '../../enums';

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

  @Column({
    type: 'enum',
    enum: EmergencyStatus,
    default: EmergencyStatus.PENDING, // Default value
  })
  status!: EmergencyStatus;

  @Column({
    type: 'enum',
    enum: EmergencySeverity,
    default: EmergencySeverity.MEDIUM, // Default value
  })
  severity!: EmergencySeverity;

  @Column({ nullable: true })
  reportedBy?: number; // User ID

  @ManyToOne(() => AmbulanceEntity, { nullable: true })
  @JoinColumn({ name: 'idAmbulance' })
  ambulance?: AmbulanceEntity;

  @Column({
    type: 'enum',
    enum: EmergencyType,
    default: EmergencyType.UNKNOWN, // Default value
  })
  incidentType?: EmergencyType;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes?: string;
  // Add these new fields for audit tracking
  @Column({
    nullable: true,
    type: 'timestamp',
  })
  resolvedAt?: Date;

  @Column({
    nullable: true,
    type: 'jsonb',
    default: '[]',
  })
  modificationAttempts?: string; // JSON array of attempted modifications after resolution

  @BeforeUpdate()
  trackStatusChange(): void {
    // If status is being changed to RESOLVED, record the timestamp
    if (this.status === EmergencyStatus.RESOLVED && !this.resolvedAt) {
      this.resolvedAt = new Date();
      // You could also set resolvedBy here if you have access to the current user
    }
  }

  @BeforeInsert()
  generateId(): void {
    const nanoid = customAlphabet('0123456789', 10);
    this.emergencyIc = nanoid(); // Generates an 10-character string
  }
  recordModificationAttempt(attemptedChanges: any, userId?: number): void {
    let attempts : any= [];

    // Handle the case where modificationAttempts is undefined, null, or invalid JSON
    if (this.modificationAttempts) {
      try {
        attempts = JSON.parse(this.modificationAttempts);
        if (!Array.isArray(attempts)) {
          attempts = [];
        }
      } catch (e) {
        // If parsing fails, start with an empty array
        attempts = [];
      }
    }

    // Add the new attempt
    attempts.push({
      timestamp: new Date(),
      changes: attemptedChanges,
      userId: userId || null,
    });

    // Update the field with the new stringified array
    this.modificationAttempts = JSON.stringify(attempts);
  }
}
