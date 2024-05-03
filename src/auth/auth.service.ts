import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './services/password.service';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserDto> {
    registerDto.password = await this.passwordService.hash(
      registerDto.password,
    );
    const user: UserDocument = await this.usersService.create(registerDto);
    return this.tokenService.generateResponse(user);
  }

  async login(loginDto: LoginDto): Promise<UserDto> {
    const user: UserDocument | undefined = await this.usersService.findOne(
      loginDto.email,
    );
    if (
      !user ||
      !(await this.passwordService.compare(loginDto.password, user.password))
    ) {
      throw new BadRequestException(
        'Email or password does not match our records',
      );
    }
    return this.tokenService.generateResponse(user);
  }
}
