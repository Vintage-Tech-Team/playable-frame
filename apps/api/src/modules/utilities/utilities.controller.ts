import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ToolCategory } from '@prisma/client';
import { UtilitiesService } from './utilities.service';

@ApiTags('utilities')
@Controller('utilities')
export class UtilitiesController {
  constructor(private readonly utilities: UtilitiesService) {}

  @Get('tools')
  listTools(
    @Query('category') category?: ToolCategory,
    @Query('search') search?: string,
  ) {
    return this.utilities.listTools(category, search);
  }

  @Get('tools/:slug')
  getTool(@Param('slug') slug: string) {
    return this.utilities.getToolBySlug(slug);
  }

  @Post('seed')
  seed() {
    return this.utilities.seedTools();
  }

  @Post('history/:slug')
  saveHistory(
    @Param('slug') slug: string,
    @Body() body: { inputs: object; outputs: object },
  ) {
    return this.utilities.saveHistory(slug, body.inputs, body.outputs);
  }
}
