import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/register.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  create(registerDto: RegisterDto): Promise<UserDocument> {
    return this.userModel.create(registerDto);
  }

  findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  updatePassword(password: string) {}
}
