import { Repository } from 'typeorm';
import { HospitalEntity, IHospitalRepository } from '@tevet-troc/models';
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
    async update(payload: Partial<HospitalEntity>): Promise<string> {
      if (!payload.name) {
        throw 'Please provide a name';
      }
      try {
        const hospital = await db.findOneBy({ name: payload.name }); // Find hospital by ID

        if (!hospital) {
          return 'Hospital not found.'; // Handle not found case
        }

        // Update the hospital properties with the payload values (only if they exist in payload)
        for (const key in payload) {
          if (Object.prototype.hasOwnProperty.call(payload, key)) {
            hospital[key] = payload[key];
          }
        }

        return await db
          .save(hospital)
          .then(() => 'Hospital updated')
          .catch(() => {
            throw 'Hospital not updated due to database error.';
          });
      } catch (error) {
        console.error('Error updating hospital:', error);

        if (error instanceof httpResponseBuilder.NotFound) {
          throw error; // Re-throw NotFound errors
        } else if (
          error instanceof Error &&
          error.message.includes('database error')
        ) {
          throw httpResponseBuilder.InternalServerError(
            'Database error occurred while updating hospital.'
          );
        } else {
          throw httpResponseBuilder.InternalServerError(
            'An unexpected error occurred while updating hospital.'
          );
        }
      }
    },
    async getAll(filters) {
      try {
        return await db
          .find({
            select: filters.query,
            where: { ...filters.filterBy },
          })
          .then((value) => value)
          .catch((e) => {
            throw `Hospital not updated due to database error. ${e}`;
          });
      } catch (error) {
        throw httpResponseBuilder.InternalServerError(
          `An unexpected error occurred while updating hospital. ${error}`
        );
      }
    },
  };
}
