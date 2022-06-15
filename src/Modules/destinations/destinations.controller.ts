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
import { DestinationsService } from './destinations.service';
import { SearchDestinationsQueryDto } from './dto/search_destinations_query.dto';
import { Destinations } from './entity/destinations.entity';
import { DeleteResult } from 'typeorm';
import { CreateDestinationDto } from './dto/create_destination.dto';
import { LowerCasePipe } from '../../Shared/pipes/LowerCasePipe';

@Controller('destinations')
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @Get()
  async searchDestinations(
    @Query() query: SearchDestinationsQueryDto,
  ): Promise<Destinations[]> {
    return await this.destinationsService.searchDestinations(query);
  }

  @Post()
  @UsePipes(new LowerCasePipe())
  async createDestination(
    @Body() createRoleDto: CreateDestinationDto,
  ): Promise<Destinations> {
    return await this.destinationsService.createDestination(createRoleDto);
  }

  @Delete(':id')
  async deleteDestination(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.destinationsService.deleteDestinationById(id);
  }

  @Patch(':id')
  @UsePipes(new LowerCasePipe())
  async updateDestinationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateDestinationDto,
  ): Promise<Destinations> {
    return await this.destinationsService.updateDestinationById(id, body);
  }
}
