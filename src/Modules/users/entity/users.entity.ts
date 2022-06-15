import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentTypeEnum } from '../interfaces/DocumentTypeEnum';
import { UserStatusEnum } from '../interfaces/UserStatusEnum.enum';
import { Roles } from '../../roles/entity/role.entity';
import { Tours } from '../../tours/entity/tours.entity';
import { Reservations } from '../../reservations/entity/reservation.entity';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column()
  birthDate: string;

  @Column({ type: 'int', unique: true })
  numberDocument: number;

  @Column()
  roleId: number;

  @Column({ type: 'enum', enum: Object.values(DocumentTypeEnum) })
  typeDocument: DocumentTypeEnum;

  @Column({ type: 'enum', enum: Object.values(UserStatusEnum) })
  status: UserStatusEnum;

  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles;

  @OneToMany(() => Tours, (tours) => tours.user)
  tours: Tours[];

  @OneToMany(() => Reservations, (reservations) => reservations.user)
  reservations: Reservations[];
}
