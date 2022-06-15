import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientsReservationsService } from './clients-reservations.service';
import { ClientsReservations } from './entity/clientsReservations.entity';
import { SearchClientsReservationQueryDto } from './dto/search_clients_reservation_query.dto';
import { CreateClientsReservationsBodyDto } from './dto/create_clients_reservations_body.dto';
import { UpdateClientsReservationsBodyDto } from './dto/update_clients_reservations_body.dto';

@Controller('clients-reservations')
export class ClientsReservationsController {
  constructor(private clientsReservationsService: ClientsReservationsService) {}

  @Get()
  async getClientsReservations(
    @Query() searchClientsReservationQueryDto: SearchClientsReservationQueryDto,
  ): Promise<ClientsReservations[]> {
    return await this.clientsReservationsService.search(
      searchClientsReservationQueryDto,
    );
  }

  @Get(':id')
  async getClientsReservationsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClientsReservations> {
    return await this.clientsReservationsService.searchById(id);
  }

  @Post()
  async createClientsReservation(
    @Body() createClientsReservationBodyDto: CreateClientsReservationsBodyDto,
  ): Promise<ClientsReservations> {
    return await this.clientsReservationsService.create(
      createClientsReservationBodyDto,
    );
  }

  @Patch(':id')
  async updateClientsReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientsReservationsBodyDto: UpdateClientsReservationsBodyDto,
  ) {
    return await this.clientsReservationsService.update(
      id,
      updateClientsReservationsBodyDto,
    );
  }

  @Delete()
  async deleteClientsReservations(@Body('ids') ids: number | number[]) {
    return await this.clientsReservationsService.delete(ids);
  }
}
