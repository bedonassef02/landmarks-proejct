import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserDocument } from '../../users/entities/user.entity';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async changePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user: UserDocument = await this.usersService.findById(id);
    if (
      await this.passwordService.compare(
        updatePasswordDto.current_password,
        user.password,
      )
    ) {
      const hashedPassword: string = await this.passwordService.hash(
        updatePasswordDto.new_password,
      );
      const updated_user: UserDocument = await this.usersService.update(id, {
        password: hashedPassword,
      });
      return this.tokenService.generateResponse(updated_user);
    }
    throw new UnauthorizedException('incorrect password');
  }
}
