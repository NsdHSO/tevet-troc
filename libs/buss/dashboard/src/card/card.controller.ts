import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { CardSchema } from '@app/models/lib/applications/card/CardSchema';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { httpResponseBuilder, isErrorObject } from '@app/http-response';
import { cardResponseSchema } from '@app/models/lib/applications/card/CardSchema/responses';

@Controller('')
export class CardController {
  private readonly _loggerService = new Logger(CardService.name);

  constructor(private readonly cardService: CardService) {}

  @ApiBody({ schema: CardSchema as SchemaObject })
  @ApiResponse({ schema: cardResponseSchema as SchemaObject })
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    try {
      if (!createCardDto.dashboardName) {
        throw httpResponseBuilder.BadRequest('Dashboard name not provided');
      }

      return httpResponseBuilder.OK(this.cardService.create(createCardDto));
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

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
