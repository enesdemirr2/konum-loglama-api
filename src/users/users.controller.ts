// src/modules/users/users.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/inputs/create-user-dto.input';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  // Örnek bir kullanıcı listeleme
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  // Örnek bir tekil kullanıcı getirme
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }
}
