import { BankEnum, PaymentMethodEnum } from '../interfaces/payments.interfaces';

export class SearchPaymentsQueryDto {
  verificationCode?: string;
  startDate?: number;
  endDate?: number;
  senderBank?: BankEnum;
  receptorBank?: BankEnum;
  paymentMethod?: PaymentMethodEnum;
  senderName?: string;
  currency?: string;
  reservationId?: string;
}
