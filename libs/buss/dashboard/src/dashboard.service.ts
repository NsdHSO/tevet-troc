import { Inject, Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DashboardEntity } from '@app/models';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(getRepositoryToken(DashboardEntity))
    private readonly _dashboardRepository: Repository<DashboardEntity>,
  ) {}

  create(createDashboardDto: CreateDashboardDto) {
    if (!createDashboardDto.name || !createDashboardDto.cards cards.length === 0) {
      console.error('Name and non-empty cards are required.');
      return null;
    }

  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }
}
