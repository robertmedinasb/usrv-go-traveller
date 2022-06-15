import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  BankEnum,
  CurrencyEnum,
  PaymentMethodEnum,
} from '../interfaces/payments.interfaces';
import { Reservations } from '../../reservations/entity/reservation.entity';
import { Clients } from '../../clients/entity/clients.entity';

@Entity('Payments')
export class Payments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  verificationCode: number;

  @Column()
  paymentData: number;

  @Column()
  created: number;

  @Column({ type: 'enum', enum: BankEnum })
  senderBank: BankEnum;

  @Column({ type: 'enum', enum: BankEnum })
  receptorBank: BankEnum;

  @Column({ type: 'enum', enum: PaymentMethodEnum })
  paymentMethodEnum: PaymentMethodEnum;

  @Column()
  senderName: string;

  @Column()
  amount: number;

  @Column({ type: 'enum', enum: CurrencyEnum })
  currency: CurrencyEnum;

  @Column()
  reservationId: number;

  @Column()
  clientId: number;

  @OneToOne(() => Reservations, (reservations) => reservations.payment)
  reservation: Reservations;

  @ManyToOne(() => Clients, (clients) => clients.payments)
  client: Clients;
}
