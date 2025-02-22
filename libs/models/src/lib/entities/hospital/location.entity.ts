import { Column, Entity } from 'typeorm';

@Entity()
export class LocationEntity {
  @Column({ type: 'decimal', precision: 9, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  longitude: number;
}
