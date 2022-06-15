import { Injectable } from '@nestjs/common';
import { SearchDestinationsQueryDto } from './dto/search_destinations_query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Destinations } from './entity/destinations.entity';
import { Repository } from 'typeorm';
import { CodeErrorEnum, ErrorResponse } from '../../Shared/helpers/errors';
import { CreateDestinationDto } from './dto/create_destination.dto';
import { UtilsService } from '../../utils/UtilsService';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destinations)
    private destinationRepository: Repository<Destinations>,
    private utilsService: UtilsService,
  ) {}

  async searchDestinations(query: SearchDestinationsQueryDto) {
    try {
      if (Object.keys(query).length === 0)
        return await this.destinationRepository.find();
      if (query.id)
        return await this.destinationRepository.findBy({ id: query.id });
      if (query.name)
        return await this.destinationRepository.findBy({
          name: this.utilsService.transformSearchByString(query.name.trim()),
        });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to searching destinations with query: ${JSON.stringify(
          query,
        )}`,
        error,
      );
    }
  }

  async createDestination(destination: CreateDestinationDto) {
    try {
      return await this.destinationRepository.save(destination);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        'There is an error trying to saving the new Destination',
        error,
      );
    }
  }

  async deleteDestinationById(id: number) {
    try {
      return await this.destinationRepository.delete(id);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an unexpected error deleting the destination with id ${id}`,
        error,
      );
    }
  }

  async updateDestinationById(
    id: number,
    updateDestinationDto: CreateDestinationDto,
  ) {
    try {
      const destination = await this.destinationRepository.findOneBy({ id });
      if (!destination) {
        throw new ErrorResponse(
          CodeErrorEnum.NOT_FOUND_ERROR,
          `Cannot update destination with id ${id}, because it was not found`,
        );
      }
      return await this.destinationRepository.save({
        ...destination,
        ...updateDestinationDto,
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an unexpected error deleting destination with id ${id}`,
        error,
      );
    }
  }
}
