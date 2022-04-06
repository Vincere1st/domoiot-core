import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { CreateUserDto } from '@/users/dto/create-user.dto'

@Injectable()
export class CreateUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<CreateUserDto>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => data.email))
    }
}