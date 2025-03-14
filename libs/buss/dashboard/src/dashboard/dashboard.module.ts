import { forwardRef, Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardEntity } from '@app/models';
import { CardModule } from '@app/dashboard/card/card.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DashboardEntity]),
    forwardRef(() => CardModule),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
