import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './roles/entity/role.entity';
import { UsersModule } from './users/users.module';
import { Users } from './users/entity/users.entity';
import { DestinationsModule } from './destinations/destinations.module';
import { Destinations } from './destinations/entity/destinations.entity';
import { ToursModule } from './tours/tours.module';
import { Tours } from './tours/entity/tours.entity';
import { ClientsModule } from './clients/clients.module';
import { Clients } from './clients/entity/clients.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { Reservations } from './reservations/entity/reservation.entity';
import { PaymentsModule } from './payments/payments.module';
import { Payments } from './payments/entity/payments.entity';
import { UtilsService } from '../utils/UtilsService';
import { ClientsReservationsModule } from './clients-reservations/clients-reservations.module';
import { ClientsReservations } from './clients-reservations/entity/clientsReservations.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'walrob020305',
      database: 'tesina',
      entities: [
        Roles,
        Users,
        Destinations,
        Tours,
        Clients,
        Reservations,
        Payments,
        ClientsReservations,
      ],
      synchronize: true,
    }),
    RolesModule,
    UsersModule,
    DestinationsModule,
    ToursModule,
    ClientsModule,
    ReservationsModule,
    PaymentsModule,
    UtilsService,
    ClientsReservationsModule,
  ],
})
export class AppModule {}
