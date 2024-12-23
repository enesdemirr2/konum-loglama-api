import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../entities/location.entity';
import { LogsModule } from 'src/loges/logs.module';
import { UsersModule } from 'src/users/users.module';
import { AreasModule } from 'src/areas/areas.module';
import { LogsQueueModule } from 'src/queue/LogsQueue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    LogsModule,
    UsersModule,
    AreasModule, 
    LogsQueueModule
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [TypeOrmModule]
})
export class LocationsModule {}
