import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { Clients } from './entity/clients.entity';
import { UtilsService } from '../../utils/UtilsService';

@Module({
  controllers: [ClientsController],
  imports: [TypeOrmModule.forFeature([Clients])],
  providers: [ClientsService, UtilsService],
  exports: [ClientsService],
})
export class ClientsModule {}
