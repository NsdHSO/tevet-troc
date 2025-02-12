import { Repository } from 'typeorm';
import { AnimalEntity } from '@tevet-troc/models';
import { IAnimalRepository } from '../../applications';

export default function (db: Repository<AnimalEntity>): IAnimalRepository {
  return {};
}
