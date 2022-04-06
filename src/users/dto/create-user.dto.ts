import { UserDto } from './user.dto'
import { Exclude } from 'class-transformer'

@Exclude()
export class CreateUserDto extends UserDto {

}
