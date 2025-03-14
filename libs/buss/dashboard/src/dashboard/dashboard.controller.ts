import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { ApiBody } from '@nestjs/swagger';
import { DashboardSchema } from '@app/models/lib/applications/dashboard/schema/dashboardSchema';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { httpResponseBuilder, isErrorObject } from '@app/http-response';

@Controller('')
export class DashboardController {
  private readonly _loggerService = new Logger(DashboardService.name);

  constructor(private readonly dashboardService: DashboardService) {}

  @ApiBody({ schema: DashboardSchema as SchemaObject })
  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    try {
      return httpResponseBuilder.OK(
        this.dashboardService.create(createDashboardDto),
      );
    } catch (error) {
      this._loggerService.error(
        `Error when Create Card ${JSON.stringify(error)}`,
      ); // Replace app.log.error
      if (isErrorObject(error)) {
        return httpResponseBuilder.InternalServerError(error);
      }

      return error;
    }
  }

  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }
}
