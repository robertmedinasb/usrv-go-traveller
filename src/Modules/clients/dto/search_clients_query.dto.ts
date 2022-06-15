import { GenderEnum } from '../interfaces/GenderEnum';

export class SearchClientsQueryDto {
  id?: number;
  name?: string;
  numberDocument?: number;
  gender?: GenderEnum;
  age?: number;
  birthDate?: number;
}
