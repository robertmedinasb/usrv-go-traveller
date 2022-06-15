import { Injectable } from '@nestjs/common';
import { ClientsReservations } from './entity/clientsReservations.entity';
import { DeleteResult, Repository } from 'typeorm';
import { SearchClientsReservationQueryDto } from './dto/search_clients_reservation_query.dto';
import { UtilsService } from '../../utils/UtilsService';
import { CodeErrorEnum, ErrorResponse } from '../../Shared/helpers/errors';
import { CreateClientsReservationsBodyDto } from './dto/create_clients_reservations_body.dto';
import { UpdateClientsReservationsBodyDto } from './dto/update_clients_reservations_body.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsReservationsService {
  constructor(
    @InjectRepository(ClientsReservations)
    private clientsReservationsRepository: Repository<ClientsReservations>,
    private utilsService: UtilsService,
  ) {}

  async search(
    searchClientsReservationsDto: SearchClientsReservationQueryDto,
  ): Promise<ClientsReservations[]> {
    if (Object.keys(searchClientsReservationsDto).length === 0)
      return await this.clientsReservationsRepository.find();

    const filters: SearchClientsReservationQueryDto & any = Object.assign(
      {},
      searchClientsReservationsDto,
    );

    if (filters.startDate && filters.endDate) {
      filters.created = this.utilsService.transformSearchByDate(
        searchClientsReservationsDto.startDate,
        searchClientsReservationsDto.endDate,
      );
    }

    delete filters.startDate;
    delete filters.endDate;

    try {
      return await this.clientsReservationsRepository.find({
        where: { ...filters },
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${
          this.search.name
        } with filters:${JSON.stringify(filters)}`,
        error,
      );
    }
  }

  async searchById(id: number) {
    try {
      return await this.clientsReservationsRepository.findOneOrFail({
        where: { id },
        relations: ['client', 'reservation'],
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `There is an error trying to ${this.searchById.name} with id:${id}`,
        error,
      );
    }
  }

  async create(
    createClientsReservationsBodyDto: CreateClientsReservationsBodyDto,
  ): Promise<ClientsReservations> {
    try {
      return await this.clientsReservationsRepository.save(
        createClientsReservationsBodyDto,
      );
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${
          this.create.name
        } with body:${JSON.stringify(createClientsReservationsBodyDto)}`,
        error,
      );
    }
  }

  async update(
    id: number,
    updateClientsReservationsBodyDto: UpdateClientsReservationsBodyDto,
  ): Promise<ClientsReservations> {
    try {
      const clientsReservation =
        await this.clientsReservationsRepository.findOne({ where: { id } });

      if (!clientsReservation)
        throw new ErrorResponse(
          CodeErrorEnum.NOT_FOUND_ERROR,
          `There is an error trying to ${
            this.update.name
          } with id:${id} and body:${JSON.stringify(
            updateClientsReservationsBodyDto,
          )}`,
        );

      return await this.clientsReservationsRepository.save({
        ...clientsReservation,
        ...updateClientsReservationsBodyDto,
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${
          this.update.name
        } with body:${JSON.stringify(updateClientsReservationsBodyDto)}`,
        error,
      );
    }
  }

  async delete(clientsReservations: number | number[]): Promise<DeleteResult> {
    return await this.clientsReservationsRepository.delete(clientsReservations);
  }
}
