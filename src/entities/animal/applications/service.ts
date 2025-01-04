import { IAnimalRepository } from './repository';
import { AnimalCreated, CreateAnimal } from './models';

export function animalApplicationService (animalRepository: IAnimalRepository) {

    return {
        create(animal: CreateAnimal) {
            return animalRepository.create(animal);
        },
        findById(id: AnimalCreated['id']) {
            return animalRepository.findById(id);
        }
    };
}