import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create_role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entity/role.entity';
import { Repository } from 'typeorm';
import { CodeErrorEnum, ErrorResponse } from '../../Shared/helpers/errors';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async getRoles() {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        'There is an error trying to searching roles',
        error,
      );
    }
  }

  async getRoleById(id: number) {
    try {
      return await this.roleRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `Role with id ${id} was not found`,
      );
    }
  }

  async getRoleByName(name) {
    try {
      return await this.roleRepository.findOneByOrFail({ name });
    } catch (e) {
      throw new ErrorResponse(
        CodeErrorEnum.NOT_FOUND_ERROR,
        `Role with name ${name} not found`,
      );
    }
  }

  async createRole(role: CreateRoleDto) {
    try {
      return await this.roleRepository.save({
        ...role,
        name: role.name.toLocaleLowerCase(),
      });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        'There is an error trying to saving the new Role',
        error,
      );
    }
  }

  async deleteRoleById(id: number) {
    try {
      return await this.roleRepository.delete(id);
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an unexpected error deleting with role with id ${id}`,
        error,
      );
    }
  }

  async updateRoleById(id: number, updateRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.findOneBy({ id });
      if (!role) {
        throw new ErrorResponse(
          CodeErrorEnum.NOT_FOUND_ERROR,
          `Cannot update user role id ${id}, because it was not found`,
        );
      }
      return await this.roleRepository.save({ ...role, ...updateRoleDto });
    } catch (error) {
      throw new ErrorResponse(
        CodeErrorEnum.INTERNAL_SERVER_ERROR,
        `There is an unexpected error deleting with role with id ${id}`,
        error,
      );
    }
  }
}
