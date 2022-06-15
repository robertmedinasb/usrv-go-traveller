import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from './entity/reservation.entity';
import { UtilsService } from '../../utils/UtilsService';

@Module({
  imports: [TypeOrmModule.forFeature([Reservations])],
  providers: [ReservationsService, UtilsService],
  controllers: [ReservationsController],
  exports: [ReservationsService],
})
export class ReservationsModule {}
