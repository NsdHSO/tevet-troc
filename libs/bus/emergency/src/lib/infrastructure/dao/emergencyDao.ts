import { Repository } from 'typeorm';
import {
  EmergencyBodyStatic,
  EmergencyEntity,
  EmergencyStatus,
  IEmergencyRepository,
} from '@tevet-troc/models';
import { httpResponseBuilder } from '@tevet-troc/http-response';
import { FastifyInstance } from 'fastify';

export default function (
  db: Repository<EmergencyEntity>,
  fastify: FastifyInstance
): IEmergencyRepository {
  return {
    async create(payload: Partial<EmergencyBodyStatic>): Promise<string> {
      const createEmergency = db.create(payload);
      fastify.log.info('Emergency created');
      try {
        return await db
          .save(createEmergency)
          .then(() => {
            fastify.log.info('Emergency Saved');
            return 'Emergency created';
          })
          .catch((error) => {
            fastify.log.error(`Emergency error when saved ${error}`);
            throw `Emergency not saved ${error}`;
          });
      } catch (error) {
        throw httpResponseBuilder.Conflict(error);
      }
    },
    async update(payload: Partial<EmergencyBodyStatic>): Promise<string> {
      const updatedPayloadLocal = { ...payload };
      fastify.log.info('Emergency Updated');
      try {
        // First we need the ID of the emergency to update
        if (!updatedPayloadLocal.emergencyIc) {
          throw 'Emergency ID (emergencyIc) is required for updates';
        }

        // Find the entity by emergencyIc first to get its UUID
        const emergency = await db.findOne({
          where: { emergencyIc: updatedPayloadLocal.emergencyIc },
        });

        if (!emergency) {
          throw `Emergency with ID ${updatedPayloadLocal.emergencyIc} not found`;
        }
        // First we need the ID of the emergency to update
        if (!updatedPayloadLocal.emergencyIc) {
          throw 'Emergency ID (emergencyIc) is required for updates';
        }
        // Check if emergency is already resolved
        if (emergency.status === EmergencyStatus.RESOLVED) {
          // Record the attempted modification
          //TODO: this would be replace with user from token
          emergency.recordModificationAttempt(updatedPayloadLocal, 9999);
          return await db.save(emergency).then(() => {
            throw `You can't modify this emergency because it's already resolved`;
          }); // Save the updated audit trail
        }

        return await db
          .update(emergency.id, updatedPayloadLocal)
          .then(() => {
            fastify.log.info('Emergency Updated Saved');
            return 'Emergency Updated';
          })
          .catch((error) => {
            throw `Emergency not update ${error}`;
          });
      } catch (error) {
        fastify.log.error(`Emergency error when update ${error}`);
        throw httpResponseBuilder.Conflict(error);
      }
    },
    async getAll(filters): Promise<EmergencyEntity[]> {
      try {
        return await db
          .find({
            relations: ['ambulance'],
            select: filters.query,
            where: { ...filters.filterBy } as any,
          })
          .catch((error) => {
            fastify.log.error('Error fetching emergencies:', error);
            throw `Error fetching emergencies: ${error}`;
          });
      } catch (error) {
        fastify.log.error('Unexpected error:', error);
        throw httpResponseBuilder.Conflict(error);
      }
    },
  };
}
