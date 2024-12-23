import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/entities/area.entity';
import { CreateAreaDto } from 'src/inputs/create-area-dto.input';
import { GetAreasDto } from 'src/inputs/get-areas-dto.input';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async createArea(dto: CreateAreaDto): Promise<Area> {
    const { name, coordinates } = dto;

    // GeoJSON verisini kontrol et
    if (!coordinates || coordinates.type !== 'Polygon' || !coordinates.coordinates) {
      throw new Error('Geçersiz GeoJSON formatı.');
    }

    // PostGIS ile uyumlu GeoJSON formatında veriyi kaydet
    const newArea = this.areaRepository.create({
      name,
      coordinates,
    });

    return await this.areaRepository.save(newArea);
  }

  async getAllAreas(dto: GetAreasDto) {
  
    const cacheKey = `areas:limit=${dto.limit}:page=${dto.page}`;

    // Cache kontrolü
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [data, total] = await this.areaRepository.findAndCount({
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
