import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CitiesService } from '../../cities.service';
import { CityDocument } from '../../entities/city.entity';

@ValidatorConstraint({ name: 'IsUniqueCityConstraint', async: true })
export class IsUniqueCityConstraint implements ValidatorConstraintInterface {
  constructor(private readonly citiesService: CitiesService) {}

  async validate(value: any): Promise<boolean> {
    const city: CityDocument | null =
      await this.citiesService.findByName(value);
    return !city;
  }

  defaultMessage(): string {
    return 'city name is already exists';
  }
}
