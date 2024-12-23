import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from './locations/locations.module';
import { AreasModule } from './areas/areas.module';
import { LogsModule } from './loges/logs.module';
import { Location } from './entities/location.entity';
import { Area } from './entities/area.entity';
import { Log } from './entities/log.entity';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CacheModule.register({
      ttl: 60 * 60, // Varsayılan önbellek süresi (1 saat)
      max: 100, // Maksimum cache boyutu
      isGlobal: true, // Cache'i global yapar
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      logging: true,
      synchronize: true, // Geliştirme için aktif, üretimde devre dışı bırak
    }),
    TypeOrmModule.forFeature([Location, Area, Log]),
    LocationsModule,
    AreasModule,
    LogsModule,
    UsersModule
  ],
})
export class AppModule {}
