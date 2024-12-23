// src/modules/users/users.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/inputs/create-user-dto.input';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email } = createUserDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create({
      name,
      email,
    });
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
