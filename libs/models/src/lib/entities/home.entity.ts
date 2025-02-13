import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('home')
export class HomeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Add the definite assignment assertion (!)
}
