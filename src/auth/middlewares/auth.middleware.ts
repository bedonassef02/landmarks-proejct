import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  async use(req: any, res: any, next: () => void): Promise<void> {
    const { access_token } = req.cookies;
    if (!access_token) {
      throw new UnauthorizedException('token is required');
    }
    req.user = await this.tokenService.verify(access_token);
    next();
  }
}
