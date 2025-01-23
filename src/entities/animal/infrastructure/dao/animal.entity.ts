import { Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';
import { BaseEntityWithUpdateAndCreationDate } from '../../../../utils/dao/base-entity-with-update-and-creation-date';
import { UserDID } from '../../../auth/infrastructure/dao/userId';

@Entity('animal')
export class AnimalEntity extends BaseEntityWithUpdateAndCreationDate {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column(() => UserDID)
    user!: UserDID;

    @Column({
        type: 'varchar',
        length: 255
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    type!: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: true
    })
    breed?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description?: string;

    @Column({
        type: 'int',
        nullable: true
    })
    age?: number;

    @Column({
        type: 'int',
        nullable: true
    })
    lifespan?: number;

    @Column({
        type: 'jsonb',
        nullable: true
    })
    weight?: { min: number; max: number };

    @Column({
        type: 'jsonb',
        nullable: true
    })
    height?: { min: number; max: number };

    @Column({
        type: 'simple-array',
        nullable: true
    })
    colors?: string[];

    @Column({
        type: 'enum',
        enum: ['Male', 'Female'],
        nullable: true
    })
    gender?: 'Male' | 'Female';

    @Column({
        type: 'boolean',
        nullable: true
    })
    neutered?: boolean;

    @Column({
        type: 'int',
        nullable: true
    })
    footCount?: 2 | 4 | 0;

    @Column({
        type: 'enum',
        enum: ['Carnivore', 'Herbivore', 'Omnivore'],
        nullable: true
    })
    diet?: 'Carnivore' | 'Herbivore' | 'Omnivore';

    @Column({
        type: 'simple-array',
        nullable: true
    })
    favoriteFoods?: string[];

    @Column({
        type: 'simple-array',
        nullable: true
    })
    temperament?: ('Friendly' | 'Energetic' | 'Calm' | 'Aggressive')[];

    @Column({
        type: 'boolean',
        nullable: true
    })
    trained?: boolean;

    @Column({
        type: 'simple-array',
        nullable: true
    })
    skills?: string[];

    @Column({
        type: 'jsonb',
        nullable: true
    })
    owner?: { name: string; contact?: string };

    @Column({
        type: 'jsonb',
        nullable: true
    })
    health?: { vaccinated?: boolean; knownIssues?: string[]; lastVetVisit?: string };

    @Column({
        type: 'simple-array',
        nullable: true
    })
    activities?: string[];

    @Column({
        type: 'enum',
        enum: ['Apartment', 'House', 'Farm', 'Aquarium', 'Aviary'],
        nullable: true
    })
    homeEnvironment?: 'Apartment' | 'House' | 'Farm' | 'Aquarium' | 'Aviary';

    @Column({
        type: 'simple-array',
        nullable: true
    })
    sounds?: string[];
}
