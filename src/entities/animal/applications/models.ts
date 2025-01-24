import { AnimalSchema, AnimalClassification } from '../infrastructure/http/schema/animal/bodies';

export type IAnimal = typeof AnimalSchema.Static;

export type CreateAnimal = Partial<IAnimal>
type DomesticAnimalType = typeof AnimalClassification.static


export type AnimalCreated = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
} & IAnimal;