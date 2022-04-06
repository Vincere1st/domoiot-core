import { UserDto } from './user.dto'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class GetUserDto extends UserDto {
    @Expose()
    _id: string
}
