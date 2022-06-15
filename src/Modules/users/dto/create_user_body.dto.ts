import { DocumentTypeEnum } from '../interfaces/DocumentTypeEnum';
import { UserStatusEnum } from '../interfaces/UserStatusEnum.enum';

export class CreateUserBodyDto {
  firstName: string;
  lastName: string;
  fullName: string;
  birthDate: string;
  numberDocument: number;
  typeDocument: DocumentTypeEnum;
  roleId: number;
  status: UserStatusEnum;
}
