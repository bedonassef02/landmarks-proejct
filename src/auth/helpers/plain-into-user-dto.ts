import { UserDocument } from '../../users/entities/user.entity';
import { UserDto } from '../../users/dto/user.dto';

export function plainIntoUserDto(user: UserDocument): UserDto {
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    access_token: '',
  };
}
