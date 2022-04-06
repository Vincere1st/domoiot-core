import { Injectable } from '@nestjs/common'
import type { UpdateUserDto } from './dto/update-user.dto'
import type { GetUserDto } from './dto/get-user.dto'
import { UsersRepository } from './users.repository'
import { UserDto } from './dto/user.dto'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {

  constructor(private readonly userRepository: UsersRepository) {
  }

  create(userDto: CreateUserDto): Promise<UserDto> {
    return this.userRepository.create(userDto)
  }

  async findAll(): Promise<GetUserDto[]> {
    return await this.userRepository.findAll()
  }

  async findOne(username: string): Promise<GetUserDto> {
    return await this.userRepository.findOne(username)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
