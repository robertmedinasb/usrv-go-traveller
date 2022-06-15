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
import { ToursService } from './tours.service';
import { Tours } from './entity/tours.entity';
import { SearchToursQueryDto } from './dto/search_tours_query.dto';
import { UpdateTourDto } from './dto/update_tour.dto';
import { CreateTourDto } from './dto/create_tour.dto';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {}

  @Get()
  async searchTours(@Query() query: SearchToursQueryDto): Promise<Tours[]> {
    return await this.toursService.searchTours(query);
  }

  @Post()
  async createTour(@Body() createTourDto: CreateTourDto): Promise<Tours> {
    return await this.toursService.createTour(createTourDto);
  }

  @Patch(':id')
  async updateTour(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTourDto: UpdateTourDto,
  ): Promise<Tours> {
    return await this.toursService.updateTour(id, updateTourDto);
  }

  @Delete()
  async deleteTour(@Param('id', ParseIntPipe) id: number) {
    return await this.toursService.deleteTour(id);
  }
}
