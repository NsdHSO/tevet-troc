import { Repository } from 'typeorm';
import { EmergencyEntity, IEmergencyRepository } from '@tevet-troc/models';
import { httpResponseBuilder } from '@tevet-troc/http-response';

export default function (
  db: Repository<EmergencyEntity>
): IEmergencyRepository {
  return {
    async getAll(): Promise<EmergencyEntity[]> {
      try{
        return await db.find().catch((error) => {
          console.error('Error fetching emergencies:', error);
          throw `Error fetching emergencies: ${error}`;
        });
      }catch(error){
        console.error('Unexpected error:', error);
        throw httpResponseBuilder.Conflict(error);
      }
    },
  };
}
