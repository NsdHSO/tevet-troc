import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DashboardEntity } from '@app/models';
import { Repository } from 'typeorm';
import { httpResponseBuilder } from '@app/http-response';
import { CardService } from '@app/dashboard/card/card.service';

@Injectable()
export class DashboardService {
  private readonly _loggerService = new Logger(DashboardService.name);

  constructor(
    @Inject(getRepositoryToken(DashboardEntity))
    private readonly _dashboardRepository: Repository<DashboardEntity>,
    @Inject(forwardRef(() => CardService))
    private readonly _cardService: CardService,
  ) {}

  create(createDashboardDto: CreateDashboardDto) {
    if (
      !createDashboardDto.name ||
      !createDashboardDto.cards ||
      createDashboardDto.cards.length === 0
    ) {
      this._loggerService.error('Name and non-empty cards are required.');
      return httpResponseBuilder.BadRequest(
        'Name and non-empty cards are required.',
      );
    }
    const dashboard = new DashboardEntity();
    dashboard.name = createDashboardDto.name;
    dashboard.cards = createDashboardDto.cards;
    dashboard.description = createDashboardDto.description || '';
    dashboard.ownerId = createDashboardDto.ownerId || 0;
    dashboard.layoutConfig = createDashboardDto.layoutConfig || '';
    console.log(dashboard);
    return this.saveDashboardWithCards(dashboard, dashboard.cards);
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

  private async saveDashboardWithCards(dashboard: DashboardEntity, cards: any) {
    try {
      const savedDashboard = await this._dashboardRepository.save(dashboard);

      for (const card of cards) {
        card.dashboard = savedDashboard;

        await this._cardService.create({
          ...card,
          dashboard: savedDashboard,
        });
      }

      return await this._dashboardRepository
        .findOne({
          where: { id: savedDashboard.id },
          relations: ['cards'],
        })
        .catch((e) => {
          throw ` Error When Saving Dashboard with id ${savedDashboard.id} ${JSON.stringify(e)}`;
        });
    } catch (error) {
      this._loggerService.error('Error saving dashboard with cards:', error);
      throw httpResponseBuilder.Conflict(error);
    }
  }
}
