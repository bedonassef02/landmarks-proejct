import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;
@Schema({ timestamps: true })
export class Image {
  @Prop()
  path: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
