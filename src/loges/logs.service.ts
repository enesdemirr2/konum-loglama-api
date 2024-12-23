import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { GetLogsDto } from 'src/inputs/get-logs-dto.input';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
     @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getLogs(dto: GetLogsDto) {
    const cacheKey = `logs:limit=${dto.limit}:page=${dto.page}`;

    // Cache kontrolü
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const [data, total] = await this.logRepository.findAndCount({
      order: { entryTime: 'DESC' },
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
    });

    const result = {
      data,
      total,
      totalPages: Math.ceil(total / dto.limit),
    };
    // Cache'e kaydet
    await this.cacheManager.set(cacheKey, result, 3600);

    return result;
  }
}

