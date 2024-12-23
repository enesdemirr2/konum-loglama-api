import { Controller, Get, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import { GetLogsDto } from 'src/inputs/get-logs-dto.input';
import { plainToInstance } from 'class-transformer';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  async getLogs(@Query() query: Partial<GetLogsDto>) {
    const queryWithDefaults = plainToInstance(GetLogsDto, query, {
      exposeDefaultValues: true,
      excludeExtraneousValues: false,
      enableImplicitConversion: true, 
    });

    return await this.logsService.getLogs(queryWithDefaults);
  }
}
