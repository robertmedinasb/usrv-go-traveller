import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './entity/clients.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateClientBodyDto } from './dto/create_client_body.dto';
import { CodeErrorEnum, ErrorResponse } from '../../Shared/helpers/errors';
import { SearchClientsQueryDto } from './dto/search_clients_query.dto';
import { UpdateClientDto } from './dto/update_client.dto';
import { UtilsService } from '../../utils/UtilsService';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private clientsRepository: Repository<Clients>,
    private utilsService: UtilsService,
  ) {}

  async createClient(newClient: CreateClientBodyDto): Promise<Clients> {
    try {
      return await this.clientsRepository.save(newClient);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        'There is an error trying to saving the new client ',
        error,
      );
    }
  }

  async searchClients(query: SearchClientsQueryDto): Promise<Clients[]> {
    if (Object.entries(query).length === 0)
      return await this.clientsRepository.find();

    const filters: any = Object.assign({}, query);

    if (query.name)
      filters.fullName = this.utilsService.transformSearchByString(query.name);

    delete filters.name;

    try {
      return await this.clientsRepository.find({
        where: {
          ...filters,
        },
        relations: ['clientsReservation'],
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to searching ${
          Clients.name
        } with query ${JSON.stringify(query)}`,
        error,
      );
    }
  }

  async updateClient(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Clients> {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client)
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `Cannot update ${Clients.name} with id ${id}, because it was not found`,
      );
    try {
      return await this.clientsRepository.save({
        ...client,
        ...updateClientDto,
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to updating a ${Clients.name} with id: ${id}`,
        error,
      );
    }
  }

  async deleteClients(clients: number | number[]): Promise<DeleteResult> {
    return await this.clientsRepository.delete(clients);
  }
}
