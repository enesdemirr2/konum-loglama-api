import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LogProcessor } from './logsQueue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';


@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,       
      },
    }),
    BullModule.registerQueue({
      name: 'logs',
    }),
    TypeOrmModule.forFeature([Log]),
  ],
  providers: [LogProcessor],
  exports: [BullModule],
})
export class LogsQueueModule {}
