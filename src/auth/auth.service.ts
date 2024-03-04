import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PasswordService } from './services/pasword.service';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/entities/user.entity';
import { plainIntoUserDto } from './helpers/plain-into-user-dto';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    registerDto.password = await this.passwordService.hash(
      registerDto.password,
    );
    const user: UserDocument = await this.usersService.create(registerDto);
    return this.generateResponse(user);
  }

  private generateResponse(user: UserDocument): UserDto {
    const result: UserDto = plainIntoUserDto(user);
    result.token = this.jwtService.sign(result.user);
    return result;
  }
}
