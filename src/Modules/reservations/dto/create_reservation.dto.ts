import { ReservationStatusEnum } from '../interfaces/reservations.interfaces';

export class CreateReservationDto {
  clientId: number;
  totalPax?: number;
  status: ReservationStatusEnum;
  userId: number;
  total?: number;
  debt?: number;
  tourId: number;
}
