import { Repository } from 'typeorm';
import {
  EmergencyBodyStatic,
  EmergencyEntity,
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
    async getAll(): Promise<EmergencyEntity[]> {
      try {
        return await db.find({ relations: ['ambulance'] }).catch((error) => {
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
