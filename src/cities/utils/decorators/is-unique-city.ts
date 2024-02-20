import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueCityConstraint } from '../constraints/is-unique-city.constaint';

export function IsUniqueCity(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-unique-city',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueCityConstraint,
    });
  };
}
