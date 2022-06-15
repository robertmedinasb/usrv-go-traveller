import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tours } from '../../tours/entity/tours.entity';

@Entity('Destinations')
export class Destinations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Tours, (tours) => tours.destination)
  tours: Tours[];
}
