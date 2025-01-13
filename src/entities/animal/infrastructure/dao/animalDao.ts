import { AnimalCreated, CreateAnimal, IAnimalRepository } from '../../applications';
import { AnimalEntity } from './animal.entity';
import { Repository } from 'typeorm';

export default function (db: Repository<AnimalEntity>): IAnimalRepository {
    return {
        async findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined> {
            return await db.findOneBy({id: id}) as any
        },
        async create(animal: CreateAnimal) {
            const animalEntity = db.create(animal);  // Create an instance of the Animal entity
            return await db.save(animalEntity)
        }
    };
}
