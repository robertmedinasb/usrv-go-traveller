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
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserBodyDto } from './dto/create_user_body.dto';
import { Users } from './entity/users.entity';
import { DeleteResult } from 'typeorm';
import { UpdateUserBodyDto } from './dto/update_user_body.dto';
import { LowerCasePipe } from '../../Shared/pipes/LowerCasePipe';
import { SearchUserQueryDto } from './dto/search_user_query.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new LowerCasePipe())
  async createUser(@Body() createUserDto: CreateUserBodyDto): Promise<Users> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async getUsers(
    @Query() searchUserQueryDto: SearchUserQueryDto,
  ): Promise<Users[]> {
    return await this.usersService.searchUsers(searchUserQueryDto);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return await this.usersService.getUserById(id);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.usersService.deleteUserById(id);
  }

  @Patch(':id')
  @UsePipes(new LowerCasePipe())
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserBodyDto,
  ): Promise<Users> {
    return await this.usersService.updateUserById(id, body);
  }
}
