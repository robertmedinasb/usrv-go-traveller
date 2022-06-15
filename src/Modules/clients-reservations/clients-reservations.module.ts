import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsReservationsService } from './clients-reservations.service';
import { ClientsReservationsController } from './clients-reservations.controller';
import { ClientsReservations } from './entity/clientsReservations.entity';
import { UtilsService } from '../../utils/UtilsService';

@Module({
  controllers: [ClientsReservationsController],
  exports: [ClientsReservationsService],
  imports: [TypeOrmModule.forFeature([ClientsReservations])],
  providers: [ClientsReservationsService, UtilsService],
})
export class ClientsReservationsModule {}
