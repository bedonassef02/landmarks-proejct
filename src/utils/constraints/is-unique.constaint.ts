import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CitiesService } from '../../cities/cities.service';
import { TagsService } from '../../tags/tags.service';

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly tagsService: TagsService,
  ) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const targetName = this.getTargetName(validationArguments);
    if (targetName === 'CreateCityDto') {
      return this.isCityNameUnique(value);
    } else {
      return this.isTagNameUnique(value);
    }
  }

  defaultMessage(): string {
    return 'The provided value already exists.';
  }

  private getTargetName(validationArguments?: ValidationArguments): string {
    return validationArguments?.targetName || '';
  }

  private async isCityNameUnique(cityName: string): Promise<boolean> {
    const cityExists = await this.citiesService.findByName(cityName);
    return !cityExists;
  }

  private async isTagNameUnique(tagName: string): Promise<boolean> {
    const tagExists = await this.tagsService.findByName(tagName);
    return !tagExists;
  }
}
