import { AmbulanceModule } from '@app/ambulance';
import { DatabaseModule } from '@app/utils';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HospitalModule } from '@app/hospital';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule, RouterModule.register([
      {
        'path': 'v1',
        children: [
          {
            path: 'ambulance',
            module: AmbulanceModule,
          },
          {
            path: 'hospital',
            module: HospitalModule,
          },
        ],
      },
    ]), HospitalModule, AmbulanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
