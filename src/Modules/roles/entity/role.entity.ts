import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from '../../users/entity/users.entity';

@Entity('Roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
