import { Repository } from 'typeorm';
import {
  AmbulanceBodyStatic,
  AmbulanceEntity,
  IAmbulanceRepository,
} from '@tevet-troc/models';
import { httpResponseBuilder } from '@tevet-troc/http-response';

export default function (
  db: Repository<AmbulanceEntity>
): IAmbulanceRepository {
  return {
    async create(payload: Partial<AmbulanceBodyStatic>): Promise<string> {
      const createAmbulance = db.create(payload);

      try {
        return await db
          .save(createAmbulance)
          .then(() => 'Ambulance created')
          .catch(() => {
            throw 'Ambulance not created due to database error.';
          });
      } catch (error) {
        console.error('Unexpected error:', error);
        throw httpResponseBuilder.Conflict(error);
      }
    },
  };
}
