export class SearchToursQueryDto {
  destination?: string;
  got?: number;
  date?: {
    start: number;
    end: number;
  };
}
