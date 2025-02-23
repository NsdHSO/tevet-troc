import { Repository } from 'typeorm';
import { EmergencyEntity, IEmergencyRepository } from '@tevet-troc/models';
import { httpResponseBuilder } from '@tevet-troc/http-response';
import { FastifyInstance } from 'fastify';

export default function (
  db: Repository<EmergencyEntity>,
  fastify: FastifyInstance,
): IEmergencyRepository {
  return {
    async getAll(): Promise<EmergencyEntity[]> {
      try{
        return await db.find({relations:['ambulance']}).catch((error) => {
          fastify.log.error('Error fetching emergencies:', error);
          throw `Error fetching emergencies: ${error}`;
        });
      }catch(error){
        fastify.log.error('Unexpected error:', error);
        throw httpResponseBuilder.Conflict(error);
      }
    },
  };
}
