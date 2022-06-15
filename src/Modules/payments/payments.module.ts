import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payments } from './entity/payments.entity';
import { UtilsService } from '../../utils/UtilsService';

@Module({
  controllers: [PaymentsController],
  imports: [TypeOrmModule.forFeature([Payments])],
  providers: [PaymentsService, UtilsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
