import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parandulea')
export class ParanduleaEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Add the definite assignment assertion (!)
}
