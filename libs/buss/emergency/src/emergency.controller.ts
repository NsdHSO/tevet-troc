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
  Query,
} from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { httpResponseBuilder, isErrorObject } from '@app/http-response';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  CreatedUpdatedEmergencyResponse,
  EmergencyCreateObject,
  EmergencyObject,
  EmergencyResponse,
} from '@app/models';
import { FilterType } from '@app/models/lib/applications/card/CardSchema/params';
import { parseFilterParams } from '@app/utils';

@Controller('')
export class EmergencyController {
  constructor(private readonly _emergencyService: EmergencyService) {}

  private readonly _loggerService = new Logger(EmergencyService.name);

  @ApiBody({ schema: EmergencyCreateObject as SchemaObject })
  @ApiResponse({ schema: EmergencyResponse as SchemaObject })
  @Post()
  async create(@Body() createEmergencyDto: CreateEmergencyDto) {
    try {
      return httpResponseBuilder.OK(
        await this._emergencyService.create(createEmergencyDto),
      );
    } catch (error) {
      this._loggerService.error(
        `Error when Create emergency ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }
  }

  @ApiQuery({
    name: 'fields',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'filterBy',
    required: false,
    type: String,
  })
  @Get()
  async findAll(@Query() query: FilterType) {
    try {
      this._loggerService.log(`Register Get all Emergency ${JSON.stringify(query)}`); // Replace app.log.info
      const { fields, filterBy } = query;
      const filterByParsed =
        parseFilterParams<keyof Omit<Partial<CreateEmergencyDto>, 'id'>>(
          filterBy,
        );

      const result = await this._emergencyService.findAll({
        query: fields?.split(',') as Array<
          keyof Omit<CreateEmergencyDto, 'id'>
        >,
        filterBy: filterByParsed,
      });

      return httpResponseBuilder.OK(result);
    } catch (error) {
      this._loggerService.error(
        `Error when Find Emergency ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._emergencyService.findOne(+id);
  }

  @Patch(':emergencyIc')
  @ApiBody({ schema: EmergencyObject as SchemaObject })
  @ApiResponse({ schema: CreatedUpdatedEmergencyResponse as SchemaObject })
  async update(
    @Param('emergencyIc') emergencyIc: string,
    @Body() updateEmergencyDto: UpdateEmergencyDto,
  ) {
    try {
      return httpResponseBuilder.OK(
        await this._emergencyService.update(emergencyIc, updateEmergencyDto),
      );
    } catch (error) {
      this._loggerService.error(
        `Error when Find Emergency ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._emergencyService.remove(+id);
  }
}
