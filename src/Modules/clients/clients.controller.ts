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
import { ClientsService } from './clients.service';
import { Clients } from './entity/clients.entity';
import { CreateClientBodyDto } from './dto/create_client_body.dto';
import { SearchClientsQueryDto } from './dto/search_clients_query.dto';
import { LowerCasePipe } from '../../Shared/pipes/LowerCasePipe';
import { UpdateClientDto } from './dto/update_client.dto';
import { DeleteResult } from 'typeorm';
import { DeleteClientsDto } from './dto/delete_clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @UsePipes(new LowerCasePipe())
  async createClient(
    @Body() createClientDto: CreateClientBodyDto,
  ): Promise<Clients> {
    return await this.clientsService.createClient(createClientDto);
  }

  @Get()
  async searchClient(
    @Query() query: SearchClientsQueryDto,
  ): Promise<Clients[]> {
    return await this.clientsService.searchClients(query);
  }

  @Patch(':id')
  @UsePipes(new LowerCasePipe())
  async updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClient: UpdateClientDto,
  ): Promise<Clients> {
    return await this.clientsService.updateClient(id, updateClient);
  }

  @Delete()
  async deleteClients(@Body() body: DeleteClientsDto): Promise<DeleteResult> {
    return await this.clientsService.deleteClients(body.clients);
  }
}
