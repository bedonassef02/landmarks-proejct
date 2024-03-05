import { Body, Controller, Patch } from '@nestjs/common';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { ProfileService } from '../services/profile.service';
import { User } from '../../users/utils/decorators/user.decorator';

@Controller({ path: 'profile', version: '1' })
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Patch('change-password')
  changePassword(
    @User('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.profileService.changePassword(id, updatePasswordDto);
  }
}
