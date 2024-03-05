import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './services/pasword.service';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/entities/user.entity';
import { plainIntoUserDto } from './helpers/plain-into-user-dto';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserDto> {
    registerDto.password = await this.passwordService.hash(
      registerDto.password,
    );
    const user: UserDocument = await this.usersService.create(registerDto);
    return this.generateResponse(user);
  }

  async login(loginDto: LoginDto): Promise<UserDto> {
    const user: UserDocument | undefined = await this.usersService.findOne(
      loginDto.email,
    );
    if (user) {
      return this.generateResponse(user);
    }
    throw new BadRequestException('email or password is incorrect');
  }

  private generateResponse(user: UserDocument): UserDto {
    const result: UserDto = plainIntoUserDto(user);
    result.token = this.jwtService.sign(result.user);
    return result;
  }
}
