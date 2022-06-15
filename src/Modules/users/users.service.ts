import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { CreateUserBodyDto } from './dto/create_user_body.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Roles } from '../roles/entity/role.entity';
import { CodeErrorEnum, ErrorResponse } from '../../Shared/helpers/errors';
import { UpdateUserBodyDto } from './dto/update_user_body.dto';
import { UtilsService } from '../../utils/UtilsService';
import { SearchUserQueryDto } from './dto/search_user_query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Users>,
    private utilsService: UtilsService,
  ) {}

  async searchUsers(searchUserQueryDto: SearchUserQueryDto): Promise<Users[]> {
    if (Object.keys(searchUserQueryDto).length === 0)
      return await this.usersRepository.find({ relations: ['role'] });

    const filters: any = Object.assign({}, searchUserQueryDto);

    if (filters.name) {
      filters.fullName = this.utilsService.transformSearchByString(
        filters.name,
      );
      delete filters.name;
    }

    try {
      return await this.usersRepository.find({
        where: { ...filters },
        relations: ['role'],
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        'There is an error trying to searching users',
        error,
      );
    }
  }

  async getUserById(id: number): Promise<Users> {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id },
        relations: ['role'],
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `User with id ${id} was not found`,
        error,
      );
    }
  }

  async createUser(newUser: CreateUserBodyDto) {
    const role = await this.rolesRepository.findOneBy({ id: newUser.roleId });
    if (!role)
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `Role with id ${newUser.roleId} not found`,
      );
    try {
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        'There is an error trying to saving the new User',
        error,
      );
    }
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `Cannot delete user with id ${id}, because it was not found`,
      );
    }
    try {
      return await this.usersRepository.delete(user.id);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an unexpected error deleting with user with id ${id}`,
        error,
      );
    }
  }

  async updateUserById(
    id: number,
    updateUserDto: UpdateUserBodyDto,
  ): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user)
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `Cannot update user with id ${id}, because it was not found`,
      );

    try {
      return await this.usersRepository.save({
        ...user,
        ...updateUserDto,
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an unexpected error updating with user with id ${id}`,
        error,
      );
    }
  }
}
