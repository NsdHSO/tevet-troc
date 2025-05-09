import { Column, Entity } from 'typeorm';
import { CarMake, CarModel } from '../../enums';

@Entity()
export class CarEntity {
  @Column({
    type: 'enum',
    enum: CarMake,
    enumName: 'ambulance_car_details_make_enum', // important!
    default: CarMake.MERCEDES_BENZ,
  })
  make!: CarMake;

  @Column({
    type: 'enum',
    enum: CarModel,
    enumName: 'ambulance_car_details_model_enum', // important!
    default: CarModel.SPRINTER,
  })
  model!: CarModel; // Restricted to predefined models

  @Column({ type: 'int' })
  year!: number;

  @Column()
  color!: string;

  @Column({ default: false })
  isAmbulance!: boolean; // Flag to indicate if the car is used as an ambulance

  @Column({ nullable: true })
  licensePlate?: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  mileage?: number; // Optional, in km or miles
}
