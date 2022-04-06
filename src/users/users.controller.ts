import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors, UseGuards,
} from '@nestjs/common'
import {UsersService} from './users.service'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {GetUserDto} from './dto/get-user.dto'
import MongooseClassSerializerInterceptor from '@/interceptors/mongooseClassSerializerInterceptor'
import {UserDto} from './dto/user.dto'
import {JwtAuthGuard} from '@/auth/guards/jwt-auth.guard'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(CreateUserDto))
    @Post()
    async create(response, @Body() createUser: CreateUserDto) {
        return await this.userService.create(createUser)
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(MongooseClassSerializerInterceptor(GetUserDto))
    @Get()
    findAll(): Promise<GetUserDto[]> {
        return this.userService.findAll()
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(GetUserDto))
    @Get(':username')
    findOne(@Param('username') username: string) {
        return this.userService.findOne(username)
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(UpdateUserDto))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto)
    }

    @UseInterceptors(MongooseClassSerializerInterceptor(UserDto))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id)
    }
}
