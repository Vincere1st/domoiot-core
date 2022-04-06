import {Injectable, UnauthorizedException} from '@nestjs/common'
import {UsersService} from '../users/users.service'
import {JwtService} from '@nestjs/jwt'
import {User} from '../users/entities/users.entity'
import bcrypt from 'bcrypt'
import {GetUserDto} from "../users/dto/get-user.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private readonly jwtService: JwtService) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const userDto: GetUserDto = await this.usersService.findOne(user.username)
        const payload = {username: userDto.username, id: userDto._id}
        return {
            token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload)
        }
    }

    // public createAccessTokenFromRefreshToken (refreshToken: string) {
    //     try {
    //         const decoded = this.jwtService.decode(refreshToken) as TokenPayload;
    //         if (!decoded) {
    //             throw new Error();
    //         }
    //         // const user = await this.usersService.getUserByEmail(decoded.email);
    //         // if (!user) {
    //         //     throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    //         // }
    //         const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refresh_token);
    //         if (!isRefreshTokenMatching) {
    //             throw new UnauthorizedException('Invalid token');
    //         }
    //         await this.jwtService.verifyAsync<Token>(refreshToken, this.getRefreshTokenOptions(user));
    //         return this.login(user)
    //     } catch {
    //         throw new UnauthorizedException('Invalid token');
    //     }
    // }
    //
    // getRefreshTokenOptions(user: User): JwtSignOptions {
    //     return this.getTokenOptions('refresh', user);
    // }
    //
    // private getTokenOptions(type: string, user: User) {
    //     const options: JwtSignOptions = {
    //         secret: this.config.get().refreshTokenSecret,
    //     };
    //     const expiration: string = this.config.get().refreshTokenExpiration;
    //     if (expiration) {
    //         options.expiresIn = expiration;
    //     }
    //     return options;
    // }
}
