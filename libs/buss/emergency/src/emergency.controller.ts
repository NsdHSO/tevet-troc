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
import { EmergencyService } from './emergency.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { httpResponseBuilder, isErrorObject } from '@app/http-response';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { EmergencyObject, EmergencyResponse } from '@app/models';

@Controller('')
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  private readonly _loggerService = new Logger(EmergencyService.name);

  @ApiBody({ schema: EmergencyObject as SchemaObject })
  @ApiResponse({ schema: EmergencyResponse as SchemaObject })
  @Post()
  async create(@Body() createEmergencyDto: CreateEmergencyDto) {
    try {
      return httpResponseBuilder.OK(
        await this.emergencyService.create(createEmergencyDto),
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

  @Get()
  findAll() {
    return this.emergencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmergencyDto: UpdateEmergencyDto,
  ) {
    return this.emergencyService.update(+id, updateEmergencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyService.remove(+id);
  }
}
