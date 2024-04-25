import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LlmDocument = HydratedDocument<Llm>;

@Schema({ timestamps: true })
export class Llm {
  @Prop({ unique: true })
  url: string;
}

export const LlmSchema = SchemaFactory.createForClass(Llm);
