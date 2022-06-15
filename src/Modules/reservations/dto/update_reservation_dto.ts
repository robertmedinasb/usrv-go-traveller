import { ReservationStatusEnum } from '../interfaces/reservations.interfaces';

export class UpdateReservationDto {
  clientId?: number;
  totalPax?: number;
  status?: ReservationStatusEnum;
  total?: number;
  debt?: number;
  tourId?: number;
}
