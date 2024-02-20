import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Landmark } from './landmark.entity';

export type ImageDocument = HydratedDocument<Image>;
@Schema({ timestamps: true })
export class Image {
  @Prop()
  path: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Landmark' })
  landmark: Landmark;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
