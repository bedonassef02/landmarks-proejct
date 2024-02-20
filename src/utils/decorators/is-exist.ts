import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsExistConstraint } from '../constraints/is-exist.constaint';

export function IsExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'is-exist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistConstraint,
    });
  };
}
