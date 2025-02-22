import { Repository } from 'typeorm';
import { EmergencyEntity, IEmergencyRepository } from '@tevet-troc/models';

export default function (
  db: Repository<EmergencyEntity>
): IEmergencyRepository {
  return {};
}
