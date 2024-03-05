import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../../users/entities/user.entity';
import { UserDto } from '../../users/dto/user.dto';
import { plainIntoUserDto } from '../helpers/plain-into-user-dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateResponse(user: UserDocument): UserDto {
    const result: UserDto = plainIntoUserDto(user);
    result.access_token = this.generateToken(result.user);
    return result;
  }

  generateToken(payload: any): any {
    return this.jwtService.sign(payload);
  }
}
