import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tag } from '../../tags/entities/tag.entity';
import { Location } from './location.entity';
import { City } from '../../cities/entities/city.entity';

export type LandmarkDocument = HydratedDocument<Landmark>;

@Schema({ timestamps: true })
export class Landmark {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  era: string;

  @Prop()
  famous_figures: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  location: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: City;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Tag' })
  tags: [Tag];

  @Prop([{ type: String }])
  images: string[];

  @Prop()
  price: number;

  @Prop()
  opening_hours: string;

  @Prop({ type: Number, default: 0 })
  likes_count: number;

  @Prop()
  cover_image: string;
  @Prop({ type: Boolean, default: false })
  is_recommended: boolean;
}

export const LandmarkSchema = SchemaFactory.createForClass(Landmark);
