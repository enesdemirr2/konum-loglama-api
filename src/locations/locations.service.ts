import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from 'src/entities/area.entity';
import { Log } from 'src/entities/log.entity';
import { User } from 'src/entities/user.entity';
import { LocationDto } from 'src/inputs/post-locaiton-dto.input';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectQueue('logs') private readonly logQueue: Queue, // Log kuyruğu
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async checkAndLogLocation(dto: LocationDto): Promise<string> {
    const { userId, latitude, longitude } = dto;
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) { 
      throw new Error('Kullanıcı bulunamadı');
    }
  
    // Kullanıcının konumunu GeoJSON formatına dönüştür
    const userCoordinates = {
      type: 'Point',
      coordinates: [longitude, latitude], // GeoJSON formatında [lon, lat]
    };
  
    // Tüm tanımlı alanları al
    const areas = await this.areaRepository.find();
  
    // Kullanıcının konumunu alanlarla karşılaştır
    for (const area of areas) {
      const areaGeometry = JSON.stringify(area.coordinates); // GeoJSON formatında
      const userGeometry = JSON.stringify(userCoordinates);
      const isInside = await this.areaRepository.query(
        `SELECT ST_Contains(
          ST_SetSRID(ST_GeomFromGeoJSON($1), 4326),
          ST_SetSRID(ST_GeomFromGeoJSON($2), 4326)
        ) AS is_inside`,
        [areaGeometry, userGeometry],
      );
  
      if (isInside[0]?.is_inside) {
        // Kullanıcının bu alanın içinde olduğunu logla
        // Log verisini kuyruğa ekle
        await this.logQueue.add({
          userId: user.id,
          areaId: area.id,
          entryTime: new Date(),
        });
        //await this.logRepository.save(log);
  
        return `Kullanıcı ID ${userId}, Alan ID ${area.id} içine girdi. Log kaydedildi.`;
      }
    }
  
    return 'Kullanıcı hiçbir alanın içine girmedi.';
  }
  
}
