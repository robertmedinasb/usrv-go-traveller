import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payments } from './entity/payments.entity';
import { DeleteResult, Repository } from 'typeorm';
import { SearchPaymentsQueryDto } from './dto/search_payment_query.dto';
import { CodeErrorEnum, ErrorResponse } from '../../Shared/helpers/errors';
import { UtilsService } from '../../utils/UtilsService';
import { CreatePaymentBodyDto } from './dto/create_payment_body.dto';
import { UpdatePaymentBodyDto } from './dto/update_payment_body.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private paymentsRepository: Repository<Payments>,
    private utilsService: UtilsService,
  ) {}

  async search(
    searchClientsQueryDto: SearchPaymentsQueryDto,
  ): Promise<Payments[]> {
    if (Object.keys(searchClientsQueryDto).length === 0)
      return await this.paymentsRepository.find();

    const filters: SearchPaymentsQueryDto & any = Object.assign(
      {},
      searchClientsQueryDto,
    );

    if (searchClientsQueryDto.senderName)
      filters.senderName = this.utilsService.transformSearchByString(
        filters.senderName,
      );

    if (searchClientsQueryDto.startDate && searchClientsQueryDto.endDate)
      filters.paymentDate = this.utilsService.transformSearchByDate(
        filters.startDate,
        filters.endDate,
      );

    delete filters.startDate;
    delete filters.endDate;

    try {
      return await this.paymentsRepository.find({ where: { ...filters } });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${
          this.search.name
        } with filters: ${JSON.stringify(searchClientsQueryDto)}`,
        error,
      );
    }
  }

  async searchPaymentsWithId(id: number): Promise<Payments> {
    try {
      return this.paymentsRepository.findOne({
        where: { id },
        relations: ['reservation', 'client'],
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${
          this.create.name
        } with id: ${JSON.stringify(id)}`,
        error,
      );
    }
  }

  async create(createPaymentBodyDto: CreatePaymentBodyDto): Promise<Payments> {
    try {
      return await this.paymentsRepository.save(createPaymentBodyDto);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${
          this.create.name
        } with body: ${JSON.stringify(createPaymentBodyDto)}`,
        error,
      );
    }
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentBodyDto,
  ): Promise<Payments> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });

    if (!payment)
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `There is an error trying to ${
          this.update.name
        } with id: ${id} and body:${JSON.stringify(updatePaymentDto)}`,
      );

    try {
      return await this.paymentsRepository.save({
        id,
        ...updatePaymentDto,
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${
          this.update.name
        } with id: ${id} and body:${JSON.stringify(updatePaymentDto)}`,
        error,
      );
    }
  }

  async delete(payments: number | number[]): Promise<DeleteResult> {
    try {
      return await this.paymentsRepository.delete(payments);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an error trying to ${this.update.name} with payments: ${payments}`,
        error,
      );
    }
  }
}
