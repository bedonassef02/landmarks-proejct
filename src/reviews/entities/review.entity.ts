import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';
import { Landmark } from '../../landmarks/entities/landmark.entity';

export type ReviewDocument = HydratedDocument<Review>;
@Schema({ timestamps: true })
export class Review {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  user: User;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Landmark' })
  landmark: Landmark;
  @Prop()
  stars: number;
  @Prop()
  message: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
