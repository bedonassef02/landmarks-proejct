import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { TagsService } from '../../tags.service';
import { TagDocument } from '../../entities/tag.entity';
import { ConflictException } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsUniqueTagConstraint', async: true })
export class IsUniqueTagConstraint implements ValidatorConstraintInterface {
  constructor(private readonly tagsService: TagsService) {}

  async validate(value: any): Promise<boolean> {
    const tag: TagDocument | null = await this.tagsService.findByName(value);
    if (tag) {
      throw new ConflictException('tag name is already in use');
    }
    return true;
  }

  defaultMessage(): string {
    return 'tag name is already exists';
  }
}
