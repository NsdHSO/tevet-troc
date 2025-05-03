import { httpResponseBuilder, isErrorObject } from '@app/http-response';
import {
  AmbulanceBodySchema,
  AmbulanceEntity,
  FilterTypeAmbulance,
  GetAllAmbulanceResponse,
} from '@app/models';
import { parseFilterParams } from '@app/utils';
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
import { AmbulanceService } from './ambulance.service';
import { CreateAmbulanceDto } from './dto/create-ambulance.dto';
import { UpdateAmbulanceDto } from './dto/update-ambulance.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@Controller('')
export class AmbulanceController {
  private readonly _loggerService = new Logger(AmbulanceController.name);

  constructor(private readonly ambulanceService: AmbulanceService) {}

  @Post()
  @ApiBody({ schema: AmbulanceBodySchema as SchemaObject })
  async create(@Body() createAmbulanceDto: CreateAmbulanceDto) {
    try {
      return await this.ambulanceService.create(
        createAmbulanceDto,
        createAmbulanceDto.hospitalId,
      );
    } catch (error) {
      this._loggerService.error(
        `Error when Create Ambulance ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }

  }

  @ApiResponse({ schema: GetAllAmbulanceResponse as SchemaObject })
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
  async findAll(@Query() query: FilterTypeAmbulance) {
    try {
      this._loggerService.log(
        `Register Get all Ambulance ${JSON.stringify(query)}`,
      ); // Replace app.log.info
      const { fields, filterBy } = query;
      const filterByParsed = parseFilterParams<
        | keyof Omit<Partial<AmbulanceEntity>, 'id'>
        | keyof { pageSize: 10; page: 1 }
      >(filterBy);

      const result = await this.ambulanceService.findAll({
        query: fields?.split(',') as Array<keyof Omit<AmbulanceEntity, 'id'>>,
        filterBy: filterByParsed,
      });

      return httpResponseBuilder.OK(result);
    } catch (error) {
      this._loggerService.error(
        `Error when Updated Ambulance is register ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ambulanceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAmbulanceDto: UpdateAmbulanceDto,
  ) {
    return this.ambulanceService.update(+id, updateAmbulanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ambulanceService.remove(+id);
  }
}
