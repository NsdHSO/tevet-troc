import { AnimalCreated, CreateAnimal, IAnimalRepository } from '../../applications';
import { Animal } from './animal.entity';
import { Repository } from 'typeorm';

export default function (db: Repository<Animal>): IAnimalRepository {
    return {
        findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined> {
            return Promise.resolve(undefined);
        },
        async create(animal: CreateAnimal) {
            const animalEntity = db.create(animal);  // Create an instance of the Animal entity
            return await db.save(animalEntity).then((e) => {
                console.log('Was created');
                return e;
            }).catch(() => {
                throw  new Error("iancu")
            });
        }
    };
}