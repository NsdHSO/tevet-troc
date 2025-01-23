import { IAnimalRepository } from './repository';
import { AnimalCreated, CreateAnimal, IAnimal } from './models';
import { IAnimalHttp } from './http';
import { createError } from '../../../infrastructure/models/error';
import { LoginUser } from '../../auth/applications';
import { HttpCodeW } from '../../../infrastructure/enums/http-code';

export function animalApplicationService(animalRepository: IAnimalRepository): IAnimalHttp {
    return {
        async create(animal: CreateAnimal, userInfo: LoginUser) {
            const defaultAnimal: IAnimal = getDefaultAnimal(userInfo);

            const mergedAnimal = { ...defaultAnimal, ...animal };

            try {
                return await animalRepository.create(mergedAnimal);
            } catch (error) {
                throw createError(`Failed to save the entity. Please try again later.`, HttpCodeW.InternalServerError);
            }
        },
        async findById(id: AnimalCreated['id']) {
            try {
                const foundElement = await animalRepository.findById(id);

                if (!foundElement) {
                    return createError(`The requested entity was not found.`, HttpCodeW.NotFound);
                }
                return foundElement;
            } catch (error) {
                return  createError('The requested entity was not found.', HttpCodeW.NotFound);
            }
        }
    };
}

function getDefaultAnimal(userInfo: LoginUser): IAnimal {
    return {
        name: '',
        type: 'Friendly',
        breed: '',
        description: '',
        age: 0,
        lifespan: 0,
        weight: {
            min: 0,
            max: 0
        },
        height: {
            min: 0,
            max: 0
        },
        colors: [],
        gender: 'Male', // or 'Female'
        neutered: false,
        footCount: 4, // Default to 4 feet
        diet: 'Carnivore', // Default to omnivore
        favoriteFoods: [],
        temperament: ['Friendly'],
        trained: false,
        skills: [],
        owner: {
            name: '',
            contact: ''
        },
        health: {
            vaccinated: false,
            knownIssues: [],
            lastVetVisit: ''
        },
        activities: [],
        homeEnvironment: 'Apartment', // Default to apartment
        sounds: [],
        user: {
            uic: userInfo.uic as string,
            email: userInfo.email as string,
        }
    };
}