import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../../users/entities/user.entity';
import { UserDto } from '../../users/dto/user.dto';
import { plainIntoUserDto } from '../utils/helpers/plain-into-user-dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateResponse(user: UserDocument): UserDto {
    const result: UserDto = plainIntoUserDto(user);
    result.access_token = this.generate(result.user);
    return result;
  }

  private generate(payload: any): any {
    return this.jwtService.sign(payload);
  }

  verify(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException('token is not valid');
    }
  }
}
