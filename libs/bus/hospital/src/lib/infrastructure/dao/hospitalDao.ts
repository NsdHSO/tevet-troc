import { Repository } from 'typeorm';
import { HospitalEntity } from '@tevet-troc/models';
import { IHospitalRepository } from '../../applications';
import { httpResponseBuilder } from '@tevet-troc/http-response';

export default function (db: Repository<HospitalEntity>): IHospitalRepository {
  return {
    async create(payload: Partial<HospitalEntity>) {
      try {
        const hospital = db.create(payload);
        return await db
          .save(hospital)
          .then(() => 'Hospital created')
          .catch(() => {
            throw 'Hospital not created due to database error.';
          });
      } catch (error) {
        console.error('Unexpected error:', error);
        throw httpResponseBuilder.Conflict(error);
      }
    },
  };
}
