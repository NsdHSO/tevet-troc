import { Repository } from 'typeorm';
import { HospitalEntity } from '@tevet-troc/models';
import { IHospitalRepository } from '../../applications';

export default function (db: Repository<HospitalEntity>): IHospitalRepository {
  return {
    async create() {
      const hospitalEntity = {
        accreditation: '',
        address: '',
        annualBudget: 0,
        averageStayLength: 0,
        capacity: 0,
        ceo: '',
        description: '',
        established: 0,
        latitude: 0,
        licenseNumber: '',
        longitude: 0,
        name: '',
        nonProfit: false,
        owner: '',
        patientSatisfactionRating: 0,
        phone: '',
        revenue: 0,
        traumaLevel: '',
        website: ''
      }as HospitalEntity;
      return db.save(hospitalEntity);

    }
  };
}
