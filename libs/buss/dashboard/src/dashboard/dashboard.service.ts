import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity, DashboardEntity } from '@app/models';
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

  async create(createDashboardDto: CreateDashboardDto) {
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

    try {
      return await this.savedEntities(createDashboardDto);
    } catch (error) {
      this._loggerService.error('Error saving dashboard with cards:', error);
      const err = new Error(error.message);
      err['code'] = 409;
      throw err;
    }
  }

  private async savedEntities(createDashboardDto: CreateDashboardDto) {
    const dashboard = new DashboardEntity();
    dashboard.name = createDashboardDto.name as string;
    dashboard.description = createDashboardDto.description || '';
    dashboard.ownerId = createDashboardDto.ownerId || 0;
    dashboard.layoutConfig = createDashboardDto.layoutConfig || '';

    const savedDashboard = await this._dashboardRepository.save(dashboard);

    const savedCards: CardEntity[] = [];
    for (const cardData of (createDashboardDto.cards??[])) {
      const card = await this._cardService.create({
        ...cardData,
        dashboardName: savedDashboard.name,
      });
      savedCards.push(card);
    }

    // Return dashboard without eager loading
    savedDashboard.cards = savedCards; // Manually assign saved cards.

    return savedDashboard;
  }

  async findAll() {
    try {
      return await this._dashboardRepository.find().catch((error) => {
        throw 'Error while retrieving dashboard' + JSON.stringify(error);
      });
    } catch (error) {
      throw httpResponseBuilder.InternalServerError(error);
    }
  }

  async findOne(name: string): Promise<Partial<DashboardEntity> | null> {
    if (name === '') {
      return {};
    }
    try {
      return await this._dashboardRepository
        .findOneBy({ name })
        .then((dashboard) => {
          if (!dashboard) {
            this._loggerService.log(`Dashboard with name: ${name} not found.`);
            return null;
          }
          this._loggerService.log(`Found ${JSON.stringify(dashboard)}`);

          return dashboard;
        })
        .catch((error) => {
          throw 'Dashboard have some problem ' + JSON.stringify(error);
        });
    } catch (error) {
      throw httpResponseBuilder.InternalServerError(error);
    }
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  private async saveDashboardWithCards(dashboard: DashboardEntity, cards: any) {
    try {
      const savedDashboard = await this._dashboardRepository.save(dashboard);

      for (const card of cards) {
        card.dashboard = savedDashboard;

        await this._cardService.create(card);
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
