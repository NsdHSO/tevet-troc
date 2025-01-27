import { AnimalCreated, CreateAnimal, IAnimalRepository } from '../../applications';
import { AnimalEntity } from './animal.entity';
import { Repository } from 'typeorm';
import { LoginUser } from '../../../auth/applications';

export default function (db: Repository<AnimalEntity>): IAnimalRepository {
    return {
        async findById(id: AnimalCreated['id']): Promise<AnimalCreated | undefined> {
            return await db.findOneBy({ id: id }) as any;
        },
        async create(animal: CreateAnimal) {
            const animalEntity = db.create(animal);  // Create an instance of the Animal entity
            return await db.save(animalEntity);
        },
        async findAllByUserUic(uic: LoginUser['uic'], query) {
            return await db.find({
                select: query.query,
                where: { user: { uic: uic }, ...query.filterBy }
            });
        }
,
        async hardFiltering(uic: LoginUser['uic'], query) {
            return await db.find({
                select: query.query,
                where: { user: { uic: uic }, ...query.filterBy },

            });
        }
    };
}