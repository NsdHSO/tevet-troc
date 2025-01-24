import { IAnimalRepository } from './repository';
import { AnimalCreated, CreateAnimal, IAnimal } from './models';
import { IAnimalHttp } from './http';
import { httpResponseBuilder } from '../../../infrastructure/models/error';
import { LoginUser } from '../../auth/applications';

export function animalApplicationService(animalRepository: IAnimalRepository): IAnimalHttp {
    return {
        async create(animal: CreateAnimal, userInfo: LoginUser) {
            const defaultAnimal: IAnimal = getDefaultAnimal(userInfo);

            const mergedAnimal = { ...defaultAnimal, ...animal };

            try {
                return httpResponseBuilder.Created(await animalRepository.create(mergedAnimal));
            } catch (error) {
                throw httpResponseBuilder.InternalServerError('Failed to save the entity. Please try again later.');
            }
        },
        async findById(id: AnimalCreated['id']) {
            try {
                const foundElement = await animalRepository.findById(id);

                if (!foundElement) {
                    return httpResponseBuilder.NotFound('The requested entity was not found.');
                }
                return foundElement;
            } catch (error) {
                return httpResponseBuilder.NotFound('The requested entity was not found.');
            }
        },
        async findAll(userUic: LoginUser['uic'], query) {
            try {
                const allAnimals = await animalRepository.findAllByUserUic(userUic, { query: query.query });
                if (allAnimals.length < 0) {
                    return httpResponseBuilder.NoContent('Not Content');
                } else {
                    return httpResponseBuilder.OK(allAnimals);
                }
            } catch (error) {
                if (error.message.includes('was not found in')) {
                    return httpResponseBuilder.BadRequest(error.message);
                }
                return httpResponseBuilder.BadRequest('Something go wrong');
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
            uic: userInfo.uic as number,
            email: userInfo.email as string,
        }
    };
}