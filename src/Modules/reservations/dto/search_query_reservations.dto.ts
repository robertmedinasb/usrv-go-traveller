import { ReservationStatusEnum } from '../interfaces/reservations.interfaces';

export class SearchQueryReservationsDto {
  id?: number;
  clientId?: number;
  tourId?: number;
  startDate?: number;
  endDate?: number;
  status?: ReservationStatusEnum;
  userId?: number;
  tourName?: string;
  gotName?: string;
  userName?: string;
  destinationName?: string;
}
