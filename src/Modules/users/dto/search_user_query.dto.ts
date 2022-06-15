import { DocumentTypeEnum } from '../interfaces/DocumentTypeEnum';
import { UserStatusEnum } from '../interfaces/UserStatusEnum.enum';

export class SearchUserQueryDto {
  name?: string;
  birthDate?: string;
  numberDocument?: number;
  typeDocument?: DocumentTypeEnum;
  roleId?: number;
  status?: UserStatusEnum;
}
