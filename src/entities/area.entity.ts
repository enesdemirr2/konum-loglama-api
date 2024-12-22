import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('geometry', { spatialFeatureType: 'Polygon', srid: 4326 })
  coordinates: any; // GeoJSON veya dönüştürülmüş WKT verisini kaydetmek için
}
