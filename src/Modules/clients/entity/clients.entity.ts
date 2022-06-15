import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentTypeEnum } from '../interfaces/DocumentTypeEnum';
import { GenderEnum } from '../interfaces/GenderEnum';
import { Reservations } from '../../reservations/entity/reservation.entity';
import { Payments } from '../../payments/entity/payments.entity';
import { ClientsReservations } from '../../clients-reservations/entity/clientsReservations.entity';

@Entity('Clients')
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  fullName: string;

  @Column({ default: '' })
  birthDate: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'int', default: 0 })
  age: number;

  @Column({ type: 'enum', enum: Object.values(GenderEnum) })
  gender: GenderEnum;

  @Column({ type: 'int', unique: true })
  numberDocument: number;

  @Column({
    type: 'enum',
    enum: Object.values(DocumentTypeEnum),
    default: DocumentTypeEnum.DNI,
  })
  typeDocument: DocumentTypeEnum;

  @Column({ type: 'int', default: 0 })
  toursCount: number;

  @OneToMany(() => Reservations, (reservation) => reservation.client)
  reservations: Reservations[];

  @OneToMany(() => Payments, (payments) => payments.client)
  payments: Payments[];

  @OneToOne(
    () => ClientsReservations,
    (clientsReservations) => clientsReservations.client,
  )
  clientsReservation: ClientsReservations;
}
