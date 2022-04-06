import { Exclude, Expose } from 'class-transformer'
import { IsDefined, IsEmail, IsNotEmpty } from '@nestjs/class-validator'

@Exclude()
export class UserDto {
    _id: string
    @Expose()
    @IsDefined()
    @IsNotEmpty()
    username: string

    @Expose()
    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Expose({ toClassOnly: true, toPlainOnly: false })
    @IsDefined()
    @IsNotEmpty()
    password: string
}
