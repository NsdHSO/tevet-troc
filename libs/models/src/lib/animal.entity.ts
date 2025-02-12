import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animal')
export class AnimalEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Add the definite assignment assertion (!)
}
