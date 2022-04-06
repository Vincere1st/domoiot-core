import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './entities/users.entity'
// https://stackoverflow.com/questions/56924090/how-to-implement-repository-design-pattern-for-mongodb-on-nestjs
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService]
})
export class UsersModule {
}
