import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';

export class GetLogsDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    limit: number = 20;
  
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    page: number = 1;
  }