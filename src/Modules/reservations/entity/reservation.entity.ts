import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationStatusEnum } from '../interfaces/reservations.interfaces';
import { Tours } from '../../tours/entity/tours.entity';
import { Users } from '../../users/entity/users.entity';
import { Clients } from '../../clients/entity/clients.entity';
import { Payments } from '../../payments/entity/payments.entity';
import { ClientsReservations } from '../../clients-reservations/entity/clientsReservations.entity';
import { getUnixTime } from 'date-fns';

@Entity('Reservations')
export class Reservations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column({ default: getUnixTime(Date.now()) })
  created: number;

  @Column({
    type: 'enum',
    enum: ReservationStatusEnum,
    default: ReservationStatusEnum.DRAFT,
  })
  status: ReservationStatusEnum;

  @Column()
  userId: number;

  @Column({ default: 0 })
  total: number;

  @Column({ default: 0 })
  debt: number;

  @Column()
  tourId: number;

  @ManyToOne(() => Clients, (client) => client.reservations)
  client: Clients;

  @ManyToOne(() => Users, (user) => user.reservations)
  user: Users;

  @ManyToOne(() => Tours, (tours) => tours.reservations)
  tour: Tours;

  @OneToOne(() => Payments, (payments) => payments.reservation)
  payment: Payments;

  @OneToOne(
    () => ClientsReservations,
    (clientsReservations) => clientsReservations.reservation,
  )
  clientsReservation: ClientsReservations;
}
