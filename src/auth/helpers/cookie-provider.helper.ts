import { APP_INTERCEPTOR } from '@nestjs/core';
import { CookieTokenInterceptor } from '../interceptos/cookie-token.interceptor';

export const cookieProvider = {
  provide: APP_INTERCEPTOR,
  useClass: CookieTokenInterceptor,
};
