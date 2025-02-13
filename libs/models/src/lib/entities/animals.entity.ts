import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('animals')
export class AnimalsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string; // Add the definite assignment assertion (!)
}
