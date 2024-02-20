import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from '../constraints/is-unique.constaint';

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-unique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueConstraint,
    });
  };
}
