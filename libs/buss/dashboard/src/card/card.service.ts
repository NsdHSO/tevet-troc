import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity, DashboardEntity } from '@app/models';
import { Repository } from 'typeorm';
import { httpResponseBuilder } from '@app/http-response';
import { DashboardService } from '@app/dashboard/dashboard/dashboard.service';
import { UpdateCardDto } from '@app/dashboard/card/dto/update-card.dto';

@Injectable()
export class CardService {
  private readonly _loggerService = new Logger(CardService.name);

  constructor(
    @Inject(getRepositoryToken(CardEntity))
    private readonly _cardRepository: Repository<CardEntity>,
    @Inject(forwardRef(() => DashboardService))
    private readonly _dashboardService: DashboardService,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<CardEntity> {
    const cardPrepared = this._cardRepository.create(createCardDto);

    if (createCardDto?.dashboard === undefined && createCardDto.dashboardName) {
      const dashboard = await this._dashboardService.findOne(
        createCardDto.dashboardName ?? '',
      );
      if (dashboard) {
        cardPrepared.dashboard = dashboard as DashboardEntity;
      } else {
        this._loggerService.error(
          `Dashboard with name: ${createCardDto.dashboardName} not found.`,
        );
        throw httpResponseBuilder.Conflict(
          `Dashboard with name: ${createCardDto.dashboardName} not found.`,
        );
      }
    }

    try {
      return await this._cardRepository
        .save(cardPrepared)
        .then((entity) => {
          this._loggerService.log(`Card created with ID: ${entity.id}`);
          return entity;
        })
        .catch((err) => {
          throw `Error creating card ${JSON.stringify(err)}`;
        });
    } catch (error) {
      this._loggerService.error(error);
      throw httpResponseBuilder.Conflict(error);
    }
  }

  async findAll(filters?: {
    query: Array<keyof CreateCardDto>;
    filterBy: { [K in keyof Omit<CreateCardDto, 'id'>]?: any };
  }) {
    try {
      return await this._cardRepository
        .find({
          relations: ['dashboard'],
          select: filters?.query as any,
          where: {
            ...filters?.filterBy,
          } as any,
        })
        .then((cards) =>
          cards.map((card) => ({
            title: card.title,
            content: card.content,
            cardType: card.cardType,
            position: card.position,
            size: card.size,
            dataConfig: card.dataConfig,
            dashboardId: card.dashboard ? card.dashboard.id : null,
            icon: card.icon,
          })),
        )
        .catch((error) => {
          throw `Error while retrieving Card ${JSON.stringify(error)}`;
        });
    } catch (error) {
      this._loggerService.error(error);
      throw httpResponseBuilder.Conflict(error);
    }
  }

  async update(
    title: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardEntity | null> {
    const card = await this._cardRepository.findOneBy({ title });

    if (!card) {
      this._loggerService.error(`Card with ID: ${title} not found.`);
      return null;
    }

    // Update card properties
    Object.assign(card, updateCardDto);

    if (updateCardDto.dashboardName) {
      const dashboard = await this._dashboardService.findOne(
        updateCardDto.dashboardName,
      );
      if (dashboard) {
        card.dashboard = dashboard as DashboardEntity;
      } else {
        this._loggerService.error(
          `Dashboard with name: ${updateCardDto.dashboardName} not found.`,
        );
        throw httpResponseBuilder.Conflict(
          `Dashboard with name: ${updateCardDto.dashboardName} not found.`,
        );
      }
    }

    try {
      return await this._cardRepository.save(card);
    } catch (error) {
      this._loggerService.error(
        `Error updating card with ID: ${title}: ${error.message}`,
        error.stack,
      );
      throw httpResponseBuilder.Conflict(error);
    }
  }
}
