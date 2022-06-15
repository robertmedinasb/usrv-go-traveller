import {
  BankEnum,
  CurrencyEnum,
  PaymentMethodEnum,
} from '../interfaces/payments.interfaces';

export class UpdatePaymentBodyDto {
  verificationCode: number;
  paymentDate: number;
  senderBank: BankEnum;
  receptorBank: BankEnum;
  paymentMethod: PaymentMethodEnum;
  senderName: string;
  clientId: number;
  amount: number;
  currency: CurrencyEnum;
  reservationId: number;
}
