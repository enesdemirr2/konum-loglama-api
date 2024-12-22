import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from 'src/entities/log.entity';

@Processor('logs')
export class LogProcessor {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  @Process()
  async handleLog(job: Job) {
    const { userId, areaId, entryTime } = job.data;

    // Log kaydetme işlemi
    const log = this.logRepository.create({ userId, areaId, entryTime });
    await this.logRepository.save(log);

    console.log(`Log işleme tamamlandı: ${JSON.stringify(job.data)}`);
  }
}
