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
    let token: string | undefined;

    // Check if the token is provided in the Authorization header
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // If the token is not in the header, check the cookies
    if (!token) {
      const { access_token } = req.cookies;
      if (!access_token) {
        throw new UnauthorizedException('Token is required');
      }
      token = access_token;
    }

    // Verify the token
    req.user = await this.tokenService.verify(token);
    next();
  }
}
