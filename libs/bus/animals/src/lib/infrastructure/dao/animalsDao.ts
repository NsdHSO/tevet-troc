import { Repository } from 'typeorm';
import { AnimalsEntity } from '@tevet-troc/models';
import { IAnimalsRepository } from '../../applications';

export default function (db: Repository<AnimalsEntity>): IAnimalsRepository {
  return {};
}
