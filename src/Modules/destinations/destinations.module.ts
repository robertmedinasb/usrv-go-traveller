import { Module } from '@nestjs/common';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destinations } from './entity/destinations.entity';
import { UtilsService } from '../../utils/UtilsService';

@Module({
  controllers: [DestinationsController],
  imports: [TypeOrmModule.forFeature([Destinations])],
  providers: [DestinationsService, UtilsService],
  exports: [DestinationsService],
})
export class DestinationsModule {}
