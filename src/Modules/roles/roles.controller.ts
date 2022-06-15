import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create_role.dto';
import { Roles } from './entity/role.entity';
import { DeleteResult } from 'typeorm';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  async getRoles(): Promise<Roles[]> {
    return await this.rolesService.getRoles();
  }

  @Get('/id/:id')
  async geRoleById(@Param('id', ParseIntPipe) id: number): Promise<Roles> {
    return await this.rolesService.getRoleById(id);
  }

  @Get('/name/:name')
  async getRoleByName(@Param('name') name: string): Promise<Roles> {
    return await this.rolesService.getRoleByName(name);
  }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Roles> {
    return await this.rolesService.createRole(createRoleDto);
  }

  @Delete(':id')
  async deleteRoleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.rolesService.deleteRoleById(id);
  }

  @Patch(':id')
  async updateRoleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateRoleDto,
  ): Promise<Roles> {
    return await this.rolesService.updateRoleById(id, body);
  }
}
