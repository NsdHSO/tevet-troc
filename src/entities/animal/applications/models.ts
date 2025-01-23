export type CreateAnimal = Partial<IAnimal>
type DomesticAnimalType = 'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Fish' | 'Horse' | 'Cow';

export interface IAnimal {
    name: string;
    type: DomesticAnimalType | string;
    breed?: string;
    description?: string;
    age?: number;
    lifespan?: number;
    weight?: {
        min: number;
        max: number;
    };
    height?: {
        min: number;
        max: number;
    };
    user:{
        uic: string;
        email:string
    }
    colors?: string[];
    gender?: 'Male' | 'Female';
    neutered?: boolean;
    footCount?: 2 | 4 | 0;
    diet?: 'Carnivore' | 'Herbivore' | 'Omnivore';
    favoriteFoods?: string[];
    temperament?: ('Friendly' | 'Energetic' | 'Calm' | 'Aggressive')[];
    trained?: boolean;
    skills?: string[];
    owner?: {
        name: string;
        contact?: string;
    };
    health?: {
        vaccinated?: boolean;
        knownIssues?: string[];
        lastVetVisit?: string;
    };
    activities?: string[];
    homeEnvironment?: 'Apartment' | 'House' | 'Farm' | 'Aquarium' | 'Aviary';
    sounds?: string[];
}

export type AnimalCreated = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
} & IAnimal;