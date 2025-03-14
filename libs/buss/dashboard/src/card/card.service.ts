import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CardEntity } from '@app/models';
import { Repository } from 'typeorm';
import { httpResponseBuilder } from '@app/http-response';

@Injectable()
export class CardService {
  private readonly _loggerService = new Logger(CardService.name);

  constructor(
    @Inject(getRepositoryToken(CardEntity))
    private readonly _cardRepository: Repository<CardEntity>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<CardEntity> {
    if(createCardDto?.dashboard === undefined) {
      console.log("Creating card with dashboard");
    }
    try {
      return await this._cardRepository
        .save(createCardDto)
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

  findAll() {
    return `This action returns all card`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
