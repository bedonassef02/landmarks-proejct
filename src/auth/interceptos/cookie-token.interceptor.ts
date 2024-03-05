import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import {
  ACCESS_TOKEN,
  COOKIE_TOKEN_MAX_AGE_DAYS,
  DAY_IN_MILLIS,
} from '../../utils/constants/constants';

@Injectable()
export class CookieTokenInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data): void => {
        const response = context.switchToHttp().getResponse();
        if (data && data.access_token) {
          const cookieTokenMaxAge: number = this.configService.get<number>(
            COOKIE_TOKEN_MAX_AGE_DAYS,
          );
          response.cookie(ACCESS_TOKEN, data.access_token, {
            maxAge: cookieTokenMaxAge * DAY_IN_MILLIS,
          });
        }
      }),
    );
  }
}
