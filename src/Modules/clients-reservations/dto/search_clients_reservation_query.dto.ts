export class SearchClientsReservationQueryDto {
  clientId?: number;
  reservationId?: number;
  pickupPoint?: string;
  observations?: string;
  startDate?: number;
  endDate?: number;
}
