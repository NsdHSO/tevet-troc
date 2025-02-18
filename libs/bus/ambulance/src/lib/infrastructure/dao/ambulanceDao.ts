import { Repository } from 'typeorm';
import { AmbulanceEntity, IAmbulanceRepository } from '@tevet-troc/models';

export default function (
  db: Repository<AmbulanceEntity>
): IAmbulanceRepository {
  return {};
}
