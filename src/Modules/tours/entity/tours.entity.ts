import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Destinations } from '../../destinations/entity/destinations.entity';
import { Users } from '../../users/entity/users.entity';
import { Reservations } from '../../reservations/entity/reservation.entity';

@Entity('Tours')
export class Tours {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destinationId: number;

  @Column({ default: 0 })
  numberClients: number;

  @Column()
  date: number;

  @Column({ nullable: true })
  tc: number;

  @Column()
  driver: string;

  @Column()
  driverCompany: string;

  @Column()
  userId: number;

  @ManyToOne(() => Destinations, (destination) => destination.tours)
  destination: Destinations;

  @ManyToOne(() => Users, (user) => user.tours)
  user: Users;

  @ManyToOne(() => Reservations, (reservation) => reservation.tour)
  reservations: Reservations[];
}
