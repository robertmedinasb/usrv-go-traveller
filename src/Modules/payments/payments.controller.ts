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
import { PaymentsService } from './payments.service';
import { SearchPaymentsQueryDto } from './dto/search_payment_query.dto';
import { Payments } from './entity/payments.entity';
import { CreatePaymentBodyDto } from './dto/create_payment_body.dto';
import { UpdatePaymentBodyDto } from './dto/update_payment_body.dto';
import { DeleteResult } from 'typeorm';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  async searchPayments(
    @Query() searchPaymentsQueryDto: SearchPaymentsQueryDto,
  ): Promise<Payments[]> {
    return await this.paymentsService.search(searchPaymentsQueryDto);
  }

  @Get(':id')
  async getPaymentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Payments> {
    return await this.paymentsService.searchPaymentsWithId(id);
  }

  @Post()
  async createPayment(
    @Body() createPaymentBodyDto: CreatePaymentBodyDto,
  ): Promise<Payments> {
    return await this.paymentsService.create(createPaymentBodyDto);
  }

  @Patch()
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentBodyDto: UpdatePaymentBodyDto,
  ): Promise<Payments> {
    return await this.paymentsService.update(id, updatePaymentBodyDto);
  }

  @Delete()
  async deletePayment(
    @Body('ids') payments: number | number[],
  ): Promise<DeleteResult> {
    return await this.paymentsService.delete(payments);
  }
}
