import { GenderEnum } from '../interfaces/GenderEnum';
import { DocumentTypeEnum } from '../interfaces/DocumentTypeEnum';

export class UpdateClientDto {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  birthDate?: string;
  age?: number;
  gender?: GenderEnum;
  numberDocument?: number;
  typeDocument?: DocumentTypeEnum;
  toursCount?: number;
  phoneNumber?: string;
}
