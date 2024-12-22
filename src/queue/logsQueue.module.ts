import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { LogProcessor } from './logsQueue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';


@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1', // Redis sunucusunun adresi
        port: 6379,        // Varsayılan Redis portu
      },
    }),
    BullModule.registerQueue({
      name: 'logs', // Kuyruk adı
    }),
    TypeOrmModule.forFeature([Log]), // Log entitesini ekleyin
  ],
  providers: [LogProcessor],
  exports: [BullModule], // Kuyruğu dışa aktar
})
export class LogsQueueModule {}
