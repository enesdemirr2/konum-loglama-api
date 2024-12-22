import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from 'src/inputs/create-area-dto.input';
import { GetAreasDto } from 'src/inputs/get-areas-dto.input';
import { plainToInstance } from 'class-transformer';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  createArea(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.createArea(createAreaDto);
  }

  @Get()
  getAllAreas(@Query() query: Partial<GetAreasDto>) {
    const queryWithDefaults = plainToInstance(GetAreasDto, query, {
      exposeDefaultValues: true,
      excludeExtraneousValues: false,
      enableImplicitConversion: true, // Gelen verileri DTO'ya uygun türlere dönüştür
    });
    return this.areasService.getAllAreas(queryWithDefaults);
  }
}
