import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { Landmark } from '../../landmarks/entities/landmark.entity';
import mongoose from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;
@Schema({ timestamps: true })
export class Like {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  user: User;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Landmark' })
  landmark: Landmark;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
