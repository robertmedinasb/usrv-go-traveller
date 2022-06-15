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
  UsePipes,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservations } from './entity/reservation.entity';
import { SearchQueryReservationsDto } from './dto/search_query_reservations.dto';
import { CreateReservationDto } from './dto/create_reservation.dto';
import { UpdateReservationDto } from './dto/update_reservation_dto';
import { DeleteResult } from 'typeorm';
import { DeleteReservationsDto } from './dto/delete_reservations.dto';
import { LowerCasePipe } from '../../Shared/pipes/LowerCasePipe';

@Controller('reservations')
export class ReservationsController {
  constructor(private _reservationsService: ReservationsService) {}

  @Get()
  @UsePipes(new LowerCasePipe())
  async searchReservations(
    @Query() query: SearchQueryReservationsDto,
  ): Promise<Reservations[]> {
    return await this._reservationsService.search(query);
  }

  @Get(':id')
  async searchReservationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Reservations> {
    return await this._reservationsService.searchById(id);
  }

  @Post()
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservations> {
    return await this._reservationsService.create(createReservationDto);
  }

  @Patch(':id')
  async updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<Reservations> {
    return await this._reservationsService.update(id, updateReservationDto);
  }

  @Delete()
  async deleteReservations(
    @Body() deleteReservationDto: DeleteReservationsDto,
  ): Promise<DeleteResult> {
    return await this._reservationsService.delete(deleteReservationDto);
  }
}
