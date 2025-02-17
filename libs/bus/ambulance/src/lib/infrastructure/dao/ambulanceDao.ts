import { Repository } from 'typeorm';
import { AmbulanceEntity } from '@tevet-troc/models';
import { IAmbulanceRepository } from '../../applications';

export default function (
  db: Repository<AmbulanceEntity>
): IAmbulanceRepository {
  return {};
}
