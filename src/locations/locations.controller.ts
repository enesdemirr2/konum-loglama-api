import { Controller, Post, Body } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationDto } from 'src/inputs/post-locaiton-dto.input';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async logLocation(@Body() locationDto: LocationDto) {
    return await this.locationsService.checkAndLogLocation(locationDto);
  }
}
