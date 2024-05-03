import { Controller, Get, Body, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { LlmService } from './llm.service';
import { UpdateLlmDto } from './dto/update-llm.dto';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller({ path: 'llm', version: '1' })
export class LlmController {
  constructor(private readonly llmService: LlmService) {
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('llm')
  findOne() {
    return this.llmService.findOne();
  }

  @Patch()
  @UseGuards(IsAdminGuard)
  update(@Body() updateLlmDto: UpdateLlmDto) {
    return this.llmService.update(updateLlmDto);
  }
}
