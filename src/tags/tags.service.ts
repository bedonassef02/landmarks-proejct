import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './entities/tag.entity';
import { Model } from 'mongoose';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<TagDocument> {
    const isNameExist: TagDocument | undefined = await this.tagModel.findOne({
      name: createTagDto.name,
    });
    if (!isNameExist) {
      return this.tagModel.create(createTagDto);
    }
    throw new ConflictException('tag name is already in use');
  }

  findAll(): Promise<TagDocument[]> {
    return this.tagModel.find({});
  }

  async findOne(id: string): Promise<TagDocument> {
    const tag: TagDocument | undefined = await this.tagModel.findById(id);
    if (!tag) {
      throw new NotFoundException('tag id not found');
    }
    return this.tagModel.findById(id);
  }

  findByName(name: string): Promise<TagDocument> {
    return this.tagModel.findOne({ name });
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<TagDocument> {
    // Find the tag by its ID
    const tag = await this.tagModel.findById(id).exec();

    // If the tag does not exist, throw NotFoundException
    if (!tag) {
      throw new NotFoundException('Tag id not found');
    }

    // Check if a tag with the updated name already exists
    const existingTag = await this.tagModel
      .findOne({
        name: updateTagDto.name,
        _id: { $ne: id },
      })
      .exec();

    if (existingTag) {
      throw new ConflictException('Tag name is already in use');
    }

    // Update the tag and return the updated document
    return this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.tagModel.findByIdAndDelete(id);
  }
}
