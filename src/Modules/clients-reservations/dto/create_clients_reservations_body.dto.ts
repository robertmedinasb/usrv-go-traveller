export class CreateClientsReservationsBodyDto {
  clientId: number;
  reservationId: number;
  pickupPoint?: string;
  observations?: string;
  created: number;
}
