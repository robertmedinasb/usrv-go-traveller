import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clients } from '../../clients/entity/clients.entity';
import { Reservations } from '../../reservations/entity/reservation.entity';
import { getUnixTime } from 'date-fns';

@Entity('ClientsReservations')
export class ClientsReservations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column()
  reservationId: number;

  @Column({ default: '' })
  pickupPoint: string;

  @Column({ default: '' })
  observations: string;

  @Column({ default: getUnixTime(Date.now()) })
  created: number;

  @OneToOne(() => Clients, (clients) => clients.clientsReservation)
  client: Clients;

  @OneToOne(
    () => Reservations,
    (reservations) => reservations.clientsReservation,
  )
  reservation: Reservations;
}
