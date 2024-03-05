import { Controller, Patch } from '@nestjs/common';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Controller('profile')
export class ProfileController {
  @Patch('change-password')
  changePassword(updatePasswordDto: UpdatePasswordDto) {}
}
