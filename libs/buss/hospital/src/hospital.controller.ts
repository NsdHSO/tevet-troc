import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  FilterTypeHospital,
  hospitalAllResponseSchema,
  HospitalEntity,
  hospitalResponseSchema,
  HospitalSchema,
} from '@app/models';
import { parseFilterParams } from '@app/utils';
import { httpResponseBuilder, isErrorObject } from '@app/http-response';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

@Controller('')
export class HospitalController {
  private readonly _loggerService = new Logger(HospitalController.name);

  constructor(private readonly hospitalService: HospitalService) {}

  @ApiBody({ schema: HospitalSchema as SchemaObject  })
  @ApiResponse({ schema: hospitalResponseSchema as SchemaObject  })
  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.create(createHospitalDto);
  }

  @Get(':id')
  @ApiResponse({ schema: hospitalResponseSchema as SchemaObject })
  findOne(@Param('id') id: string) {
    try {
      if (!id) {
        throw httpResponseBuilder.BadRequest(`No hospital with id ${id}`);
      }
      return this.hospitalService.findOne(id);
    } catch (error) {
      this._loggerService.error(
        `Error when Retrieve Hospital ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }
  }

  @ApiResponse({ schema: hospitalAllResponseSchema as SchemaObject  })
  @Get()
  async findAll(@Query() query: FilterTypeHospital) {
    try {
      this._loggerService.log(
        `Register Get all Hospital ${JSON.stringify(query)}`,
      ); // Replace app.log.info
      const { fields, filterBy } = query;
      const filterByParsed =
        parseFilterParams<keyof Omit<Partial<HospitalEntity>, 'id'>>(filterBy);

      const result = await this.hospitalService.findAll({
        query: fields?.split(',') as Array<keyof Omit<HospitalEntity, 'id'>>,
        filterBy: filterByParsed,
      });

      return httpResponseBuilder.OK(result);
    } catch (error) {
      this._loggerService.error(
        `Error when Retrieve Hospital ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        throw new HttpException(error, error.code);
      }

      return error;
    }
  }

  @ApiBody({ schema: HospitalSchema as SchemaObject })
  @Put()
  update(@Body() updateHospitalDto: UpdateHospitalDto) {
    return this.hospitalService.update(updateHospitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalService.remove(+id);
  }
}
