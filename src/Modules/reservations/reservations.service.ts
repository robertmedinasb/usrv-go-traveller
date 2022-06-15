import { Injectable } from '@nestjs/common';
import { DeleteResult, Like, Repository } from 'typeorm';
import { Reservations } from './entity/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrorEnum, ErrorResponse } from '../../Shared/helpers/errors';
import { SearchQueryReservationsDto } from './dto/search_query_reservations.dto';
import { CreateReservationDto } from './dto/create_reservation.dto';
import { UpdateReservationDto } from './dto/update_reservation_dto';
import { DeleteReservationsDto } from './dto/delete_reservations.dto';
import { UtilsService } from '../../utils/UtilsService';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private _reservationsRepository: Repository<Reservations>,
    private _utilsService: UtilsService,
  ) {}

  async search(query: SearchQueryReservationsDto): Promise<Reservations[]> {
    try {
      if (Object.entries(query).length === 0)
        return await this._reservationsRepository.find({
          relations: [
            'client',
            'user',
            'tour',
            'tour.user',
            'tour.destination',
          ],
        });

      const filters: any = Object.assign({}, query);

      if (query.startDate && query.endDate)
        filters.created = this._utilsService.transformSearchByDate(
          new Date(query.startDate).getTime(),
          new Date(query.endDate).getTime(),
        );

      if (filters.name)
        filters.client = { fullName: Like(`%${filters.name}%`) };
      if (filters.gotName)
        filters.tour = { user: { fullName: Like(`%${filters.gotName}%`) } };
      if (filters.userName)
        filters.user = { fullName: Like(`%${filters.userName}%`) };
      if (filters.destinationName)
        filters.tour = {
          destination: { name: Like(`%${filters.destinationName}%`) },
        };

      delete filters.startDate;
      delete filters.endDate;
      delete filters.name;
      delete filters.gotName;
      delete filters.userName;
      delete filters.destinationName;

      return await this._reservationsRepository.find({
        where: { ...filters },
        relations: [
          'client',
          'tour',
          'user',
          'tour.user',
          'tour.destination',
          'tour.user.role',
        ],
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${this.create.name} ${
          Reservations.name
        } with query: ${JSON.stringify(query)}`,
        error,
      );
    }
  }

  async searchById(id: number): Promise<Reservations> {
    try {
      return await this._reservationsRepository.findOneOrFail({
        where: { id },
        relations: [
          'user',
          'tour',
          'client',
          'tour.destination',
          'tour.user',
          'user.role',
        ],
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `There is an error trying to ${this.create.name} ${Reservations.name} with id: ${id}`,
        error,
      );
    }
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservations> {
    try {
      return await this._reservationsRepository.save(createReservationDto);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${this.create.name} ${Reservations.name}`,
        error,
      );
    }
  }

  async update(
    id: number,
    createReservationDto: UpdateReservationDto,
  ): Promise<Reservations> {
    const reservation = await this._reservationsRepository.findOneBy({ id });

    if (!reservation)
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `Cannot ${this.update.name} ${Reservations.name} with id ${id}, because it was not found`,
      );

    try {
      return await this._reservationsRepository.save(createReservationDto);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${this.update.name} ${Reservations.name}`,
        error,
      );
    }
  }

  async delete(args: DeleteReservationsDto): Promise<DeleteResult> {
    try {
      return await this._reservationsRepository.delete(args.ids);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${this.delete.name} ${Reservations.name}`,
        error,
      );
    }
  }
}
