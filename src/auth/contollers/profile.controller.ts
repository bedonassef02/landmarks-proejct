import { Body, Controller, Patch } from '@nestjs/common';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { ProfileService } from '../services/profile.service';
import { User } from '../../users/utils/decorators/user.decorator';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller({ path: 'profile', version: '1' })
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: UpdatePasswordDto,
    description: 'Json structure for change password object',
  })
  @Patch('change-password')
  changePassword(
    @User('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.profileService.changePassword(id, updatePasswordDto);
  }
}
