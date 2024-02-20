import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueTagConstraint } from '../constraints/is-unique-tag.constaint';

export function IsUniqueTag(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-unique-city',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueTagConstraint,
    });
  };
}
