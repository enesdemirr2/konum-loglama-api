import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  coordinates: any;
}
