import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from '../entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [TypeOrmModule]
})
export class LogsModule {}
