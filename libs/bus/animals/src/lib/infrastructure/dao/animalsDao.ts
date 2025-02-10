import { Repository } from 'typeorm';
import { AnimalsEntity } from './animals.entity';
import { IAnimalsRepository } from '../../applications';

export default function (db: Repository<AnimalsEntity>): IAnimalsRepository {
  return {};
}
