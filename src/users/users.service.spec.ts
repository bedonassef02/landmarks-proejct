import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            findById: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const registerDto: RegisterDto = {
      name: 'test',
      email: 'test@test.com',
      password: 'password',
    };
    jest.spyOn(userModel, 'create').mockResolvedValueOnce(registerDto as any);
    expect(await service.create(registerDto)).toEqual(registerDto);
  });

  it('should find a user by email', async () => {
    const email = 'test@test.com';
    jest.spyOn(userModel, 'findOne').mockResolvedValueOnce({ email } as any);
    expect(await service.findOne(email)).toEqual({ email });
  });

  it('should find a user by id', async () => {
    const id = '1';
    jest.spyOn(userModel, 'findById').mockResolvedValueOnce({ id } as any);
    expect(await service.findById(id)).toEqual({ id });
  });

  it('should update a user', async () => {
    const id = '1';
    const updateUserDto: UpdateUserDto = { name: 'newName' };
    jest
      .spyOn(userModel, 'findByIdAndUpdate')
      .mockResolvedValueOnce({ id, ...updateUserDto } as any);
    expect(await service.update(id, updateUserDto)).toEqual({
      id,
      ...updateUserDto,
    });
  });
});
