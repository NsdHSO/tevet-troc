import { IAnimalRepository } from './repository';
import { AnimalCreated, CreateAnimal, IAnimal } from './models';

export function animalApplicationService(animalRepository: IAnimalRepository) {
    return {
        create(animal: CreateAnimal) {

            const defaultAnimal: IAnimal = {
                name: '',
                type: 'Friendly',
                breed: '',
                description: '',
                age: 0,
                lifespan: 0,
                weight: { min: 0, max: 0 },
                height: { min: 0, max: 0 },
                colors: [],
                gender: 'Male', // or 'Female'
                neutered: false,
                footCount: 4, // Default to 4 feet
                diet: 'Carnivore', // Default to omnivore
                favoriteFoods: [],
                temperament: ['Friendly'],
                trained: false,
                skills: [],
                owner: { sdf: '', contact: '' },
                health: { vaccinated: false, knownIssues: [], lastVetVisit: '' },
                activities: [],
                homeEnvironment: 'Apartment', // Default to apartment
                sounds: []
            };

            const mergedAnimal = { ...defaultAnimal, ...animal };

            return animalRepository.create(mergedAnimal).catch(error => {
                throw {newError: "Iancu"}
            });
        },
        findById(id: AnimalCreated['id']) {
            return animalRepository.findById(id);
        }
    };
}