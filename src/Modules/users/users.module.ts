import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Roles } from '../roles/entity/role.entity';
import { UtilsService } from '../../utils/UtilsService';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  providers: [UsersService, UtilsService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
