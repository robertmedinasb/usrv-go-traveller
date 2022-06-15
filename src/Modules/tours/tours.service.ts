import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tours } from './entity/tours.entity';
import { Repository } from 'typeorm';
import { SearchToursQueryDto } from './dto/search_tours_query.dto';
import { CreateTourDto } from './dto/create_tour.dto';
import { Destinations } from '../destinations/entity/destinations.entity';
import { CodeErrorEnum, ErrorResponse } from '../../Shared/helpers/errors';
import { Users } from '../users/entity/users.entity';
import { UpdateTourDto } from './dto/update_tour.dto';
import { UtilsService } from '../../utils/UtilsService';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tours)
    private toursRepository: Repository<Tours>,
    @InjectRepository(Destinations)
    private destinationsRepository: Repository<Destinations>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private utilsService: UtilsService,
  ) {}

  async searchTours(query: SearchToursQueryDto) {
    if (Object.entries(query).length === 0)
      return await this.toursRepository.find({
        relations: ['destination', 'user', 'user.role'],
      });

    const filters: any = Object.assign({}, query);

    if (query.destination)
      filters.destination = this.utilsService.transformSearchByString(
        query.destination,
      );

    if (query.date)
      filters.date = this.utilsService.transformSearchByDate(
        query.date.start,
        query.date.end,
      );

    if (query.got) filters.got = query.got;

    try {
      return await this.toursRepository.find({
        where: { ...filters },
        relations: ['destination', 'user', 'user.role'],
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to searching tours with query: ${JSON.stringify(
          query,
        )}`,
        error,
      );
    }
  }

  async createTour(createTourDto: CreateTourDto) {
    const destination = this.destinationsRepository.findOneBy({
      id: createTourDto.destinationId,
    });

    if (!destination)
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `Tour cannot be created, because destinationId ${createTourDto.destinationId} does not exist`,
      );
    try {
      if (createTourDto.got || createTourDto.tc)
        await this._validateTourBody(createTourDto);

      return await this.toursRepository.save(createTourDto);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `Error trying to creating a Tour`,
        error,
      );
    }
  }

  async updateTour(id: number, updateTourDto: UpdateTourDto) {
    const tour = await this.toursRepository.findOneBy({ id });
    await this._validateTourBody(updateTourDto);

    return await this.toursRepository.save({ ...tour, ...updateTourDto });
  }

  async deleteTour(id: number) {
    try {
      await this.toursRepository.delete(id);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        'There is an error trying to deleting tour',
        error,
      );
    }
  }

  private async _validateTourBody(body) {
    try {
      await this.usersRepository.findOneByOrFail({
        id: body.got,
      });
      await this.usersRepository.findOneByOrFail({
        id: body.got,
      });
      return true;
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        'There is an error trying to creating new Tour',
        error,
      );
    }
  }
}
