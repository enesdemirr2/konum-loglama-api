import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Area } from './area.entity';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  areaId: number;

  @Column()
  entryTime: Date;
}
