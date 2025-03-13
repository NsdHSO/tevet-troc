import { Test, TestingModule } from '@nestjs/testing';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';
import { HospitalEntity } from '@app/models';
import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.MYSQL_HOST || 'localhost',
    port: 3306,
    username: process.env.MYSQL_USERNAME || 'nest',
    password: process.env.MYSQL_PASSWORD || 'nest',
    database: process.env.MYSQL_DATABASE || 'test',
    entities: [...entities],
    synchronize: true,
  });
describe('HospitalController', () => {
  let controller: HospitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeORMMySqlTestingModule([HospitalEntity]), TypeOrmModule.forFeature([HospitalEntity])],
      controllers: [HospitalController],
      providers: [HospitalService],
    }).compile();

    controller = module.get<HospitalController>(HospitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
