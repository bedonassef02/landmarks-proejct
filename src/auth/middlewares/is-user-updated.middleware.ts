import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class IsUserUpdatedMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}
  async use(req: any, res: any, next: () => void) {
    const user = req.user;
    const dbUser: any = await this.userService.findById(user.id);
    const lastUpdate: number = parseInt(
      (dbUser.updatedAt.getTime() / 1000).toString(),
      10,
    );

    if (lastUpdate > user.iat) {
      throw new UnauthorizedException('you need to refresh the token');
    }
    next();
  }
}
