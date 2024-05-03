import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LikesService } from './likes.service';
import { Like, LikeDocument } from './entities/like.entity';
import { Model } from 'mongoose';

describe('LikesService', () => {
  let service: LikesService;
  let likeModel: Model<LikeDocument>;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        {
          provide: getModelToken(Like.name),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            findByIdAndDelete: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LikesService>(LikesService);
    likeModel = module.get<Model<LikeDocument>>(getModelToken(Like.name));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should like a landmark', async () => {
    const likeDto = { user: 'user1', landmark: 'landmark1' };
    jest.spyOn(likeModel, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(likeModel, 'create').mockResolvedValueOnce(likeDto as any);
    expect(await service.like(likeDto)).toEqual(likeDto);
    expect(eventEmitter.emit).toHaveBeenCalledWith('likes.increment', {
      id: likeDto.landmark,
      val: 1,
    });
  });

  it('should unlike a landmark', async () => {
    const likeDto = { user: 'user1', landmark: 'landmark1' };
    jest.spyOn(likeModel, 'findOne').mockResolvedValueOnce(likeDto as any);
    jest
      .spyOn(likeModel, 'findByIdAndDelete')
      .mockResolvedValueOnce(likeDto as any);
    expect(await service.like(likeDto)).toBeUndefined();
    expect(eventEmitter.emit).toHaveBeenCalledWith('likes.increment', {
      id: likeDto.landmark,
      val: -1,
    });
  });

  it('should find all likes by user', async () => {
    const user = 'user1';
    const likes = [{ landmark: 'landmark1' }, { landmark: 'landmark2' }];
    jest.spyOn(likeModel, 'find').mockResolvedValueOnce(likes as any);

    const result = await service.findAll(user);

    expect(likeModel.find).toHaveBeenCalledWith({ user }, { landmark: 1, _id: 0 });
    expect(result).toEqual(['landmark1', 'landmark2']);
  });
});
