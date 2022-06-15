import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tours } from './entity/tours.entity';
import { Destinations } from '../destinations/entity/destinations.entity';
import { Users } from '../users/entity/users.entity';
import { UtilsService } from '../../utils/UtilsService';

@Module({
  imports: [TypeOrmModule.forFeature([Tours, Destinations, Users])],
  providers: [ToursService, UtilsService],
  controllers: [ToursController],
  exports: [ToursService],
})
export class ToursModule {}
