import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CitiesService } from '../../cities/cities.service';
import { TagsService } from '../../tags/tags.service';
import { LandmarksService } from '../../landmarks/landmarks.service';
import { LandmarkDocument } from '../../landmarks/entities/landmark.entity';
import { TagDocument } from '../../tags/entities/tag.entity';
import { CityDocument } from '../../cities/entities/city.entity';

@ValidatorConstraint({ name: 'IsExist', async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly tagsService: TagsService,
  ) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const targetName = validationArguments.property;
    if (targetName === 'city') {
      return this.isCityIdExist(value);
    }
    return this.isTagIdExist(value);
  }

  defaultMessage(): string {
    return 'The provided id does not exists.';
  }

  private getTargetName(validationArguments?: ValidationArguments): string {
    return validationArguments?.targetName || '';
  }

  private async isCityIdExist(cityID: string): Promise<boolean> {
    const cityExists: CityDocument | undefined =
      await this.citiesService.findById(cityID);
    return !!cityExists;
  }
  private async isTagIdExist(tagID: string): Promise<boolean> {
    const tagExists: TagDocument | undefined =
      await this.tagsService.findById(tagID);
    return !!tagExists;
  }
}
