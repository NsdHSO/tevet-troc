import { Repository } from 'typeorm';
import { ParanduleaEntity } from './parandulea.entity';
import { IParanduleaRepository } from '../../applications';

export default function (
  db: Repository<ParanduleaEntity>
): IParanduleaRepository {
  return {};
}
