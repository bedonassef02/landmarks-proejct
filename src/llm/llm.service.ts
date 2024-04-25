import { Injectable } from '@nestjs/common';
import { UpdateLlmDto } from './dto/update-llm.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Llm, LlmDocument } from './entities/llm.entity';

@Injectable()
export class LlmService {
  private id: string = '662a2a499ef61c9f90a77f14';

  constructor(
    @InjectModel(Llm.name) private readonly llmModel: Model<LlmDocument>,
  ) {}

  async findOne() {
    return this.llmModel.findById(this.id);
  }

  update(updateLlmDto: UpdateLlmDto) {
    return this.llmModel.findByIdAndUpdate(this.id, updateLlmDto, {
      new: true,
    });
  }
}
