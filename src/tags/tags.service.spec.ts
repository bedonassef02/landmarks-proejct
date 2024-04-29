import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TagsService } from './tags.service';
import { Tag, TagDocument } from './entities/tag.entity';
import { Model } from 'mongoose';

describe('TagsService', () => {
  let service: TagsService;
  let tagModel: Model<TagDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        {
          provide: getModelToken(Tag.name),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue({}),
            findOne: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue({}),
            findByIdAndDelete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
    tagModel = module.get<Model<TagDocument>>(getModelToken(Tag.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tag', async () => {
    const createTagDto = { name: 'tag1' };
    jest.spyOn(tagModel, 'create').mockResolvedValueOnce(createTagDto as any);
    expect(await service.create(createTagDto)).toEqual(createTagDto);
  });

  it('should find all tags', async () => {
    const tags = [{ name: 'tag1' }, { name: 'tag2' }];
    jest.spyOn(tagModel, 'find').mockResolvedValueOnce(tags as any);
    expect(await service.findAll()).toEqual(tags);
  });

  it('should find a tag by id', async () => {
    const id = '1';
    jest.spyOn(tagModel, 'findById').mockResolvedValueOnce({ id } as any);
    expect(await service.findById(id)).toEqual({ id });
  });

  it('should update a tag', async () => {
    const id = '1';
    const updateTagDto = { name: 'updatedTag1' };
    jest
      .spyOn(tagModel, 'findByIdAndUpdate')
      .mockResolvedValueOnce({ id, ...updateTagDto } as any);
    expect(await service.update(id, updateTagDto)).toEqual({
      id,
      ...updateTagDto,
    });
  });

  it('should remove a tag', async () => {
    const id = '1';
    jest
      .spyOn(tagModel, 'findByIdAndDelete')
      .mockResolvedValueOnce({ id } as any);
    await service.remove(id);
    expect(tagModel.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});
