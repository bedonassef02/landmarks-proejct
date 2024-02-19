import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string): Types.ObjectId | string {
    if (!value || !Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid Mongo Id format');
    }

    return Types.ObjectId.createFromHexString(value);
  }
}
