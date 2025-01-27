import { IAnimalRepository } from './repository';
import { AnimalCreated, CreateAnimal, IAnimal } from './models';
import { IAnimalHttp } from './http';
import { LoginUser } from '../../auth/applications';
import { httpResponseBuilder } from '../../../infrastructure/models/httResponseBuilder';
import { AnimalEntity } from '../infrastructure/dao/animal.entity';

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
                const allAnimals = await animalRepository.findAllByUserUic(userUic, {
                    query: query.query,
                    filterBy: query.filterBy
                });
                if (allAnimals.length < 0) {
                    return httpResponseBuilder.NoContent('Not Content');
                }
                return httpResponseBuilder.OK(allAnimals);

            } catch (error) {
                if (error.message.includes('was not found in')) {
                    return httpResponseBuilder.BadRequest(error.message as string);
                }
                return httpResponseBuilder.BadRequest('Something go wrong');
            }
        }
        ,
        async hardFiltering(userUic: LoginUser['uic'], props: {
            query: Array<keyof AnimalEntity>;
            filterBy: { [K in keyof AnimalEntity]?: any }
        }) {
            const allAnimals = [
                ...await animalRepository.findAllByUserUic(userUic, {
                    query: props.query,
                    filterBy: props.filterBy
                })
            ];
//            bubbleSort(allAnimals)
            return httpResponseBuilder.OK(quickSort(allAnimals));
//            return httpResponseBuilder.OK(allAnimals);
        }
    };
}

function quickSort<T>(arr: T) {
    if ( arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].id > pivot.id) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, quickSort(right)];
}
function bubbleSort<T>(arr: T) {
    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j].id >= arr[j + 1].id) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }


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