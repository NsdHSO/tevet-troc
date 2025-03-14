import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CardSchema } from '@app/models/lib/applications/card/CardSchema';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { httpResponseBuilder, isErrorObject } from '@app/http-response';
import { cardResponseSchema } from '@app/models/lib/applications/card/CardSchema/responses';
import { UpdateCardDto } from '@app/dashboard/card/dto/update-card.dto';
import { parseFilterParams } from '@app/utils';
import { FilterType } from '@app/models/lib/applications/card/CardSchema/params';

@Controller('')
export class CardController {
  private readonly _loggerService = new Logger(CardService.name);

  constructor(private readonly cardService: CardService) {}

  @ApiBody({ schema: CardSchema as SchemaObject })
  @ApiResponse({ schema: cardResponseSchema as SchemaObject })
  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    try {
      if (!createCardDto.dashboardName) {
        this._loggerService.log('No dashboardName found');
      }

      return httpResponseBuilder.OK(
        await this.cardService.create(createCardDto),
      );
    } catch (error) {
      this._loggerService.error(
        `Error when Create Card ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }
  }

  @ApiQuery({ name: 'fields', required: false, type: String })
  @ApiQuery({ name: 'filterBy', required: false, type: String })
  @Get()
  async findAll(@Query() query: FilterType) {
    try {
      this._loggerService.log(`Register Get all Cars ${JSON.stringify(query)}`); // Replace app.log.info
      const { fields, filterBy } = query;
      const filterByParsed =
        parseFilterParams<keyof Omit<Partial<CreateCardDto>, 'id'>>(filterBy);

      const result = await this.cardService.findAll({
        query: fields?.split(',') as Array<keyof Omit<CreateCardDto, 'id'>>,
        filterBy: filterByParsed,
      });

      return httpResponseBuilder.OK(result);
    } catch (error) {
      this._loggerService.error(
        `Error when Find Card ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }
  }

  @ApiBody({ schema: CardSchema as SchemaObject })
  @ApiResponse({ schema: cardResponseSchema as SchemaObject })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    try {
      return httpResponseBuilder.OK(
        await this.cardService.update(id, updateCardDto),
      );
    } catch (error) {
      this._loggerService.error(
        `Error when Find Card ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }
  }
}
