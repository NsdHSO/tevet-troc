import { Repository } from 'typeorm';
import { AnimalEntity } from './animal.entity';
import { IAnimalRepository } from '../../applications';

export default function (db: Repository<AnimalEntity>): IAnimalRepository {
  return {};
}
