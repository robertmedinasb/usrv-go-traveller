import { DocumentTypeEnum } from '../../users/interfaces/DocumentTypeEnum';
import { UserStatusEnum } from '../../users/interfaces/UserStatusEnum.enum';
import { GenderEnum } from '../interfaces/GenderEnum';

export class CreateClientBodyDto {
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  numberDocument: number;
  typeDocument: DocumentTypeEnum;
  status: UserStatusEnum;
  gender: GenderEnum;
  age: number;
}
