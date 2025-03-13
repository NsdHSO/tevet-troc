import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ApiBody } from '@nestjs/swagger';
import { HospitalSchema } from '@app/models';

@Controller('')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @ApiBody({ schema: HospitalSchema as any })
  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.create(createHospitalDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalService.findOne(id);
  }

  @ApiBody({ schema: HospitalSchema as any })
  @Put()
  update(@Body() updateHospitalDto: UpdateHospitalDto) {
    return this.hospitalService.update(updateHospitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalService.remove(+id);
  }
}
