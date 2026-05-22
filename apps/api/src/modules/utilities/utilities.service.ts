import { Injectable } from '@nestjs/common';
import { ToolCategory } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { TOOL_SEED_DATA } from './tool-seed.data';

@Injectable()
export class UtilitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async listTools(category?: ToolCategory, search?: string) {
    let tools = await this.prisma.tool.findMany({
      where: {
        isActive: true,
        ...(category ? { category } : {}),
      },
      orderBy: { sortOrder: 'asc' },
    });

    if (tools.length === 0) {
      await this.seedTools();
      tools = await this.prisma.tool.findMany({
        where: { isActive: true, ...(category ? { category } : {}) },
        orderBy: { sortOrder: 'asc' },
      });
    }

    if (search) {
      const q = search.toLowerCase();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    return tools;
  }

  async getToolBySlug(slug: string) {
    return this.prisma.tool.findUnique({ where: { slug } });
  }

  async seedTools() {
    for (const tool of TOOL_SEED_DATA) {
      await this.prisma.tool.upsert({
        where: { slug: tool.slug },
        create: tool,
        update: tool,
      });
    }
    return { seeded: TOOL_SEED_DATA.length };
  }

  /** Structure-ready history — not persisted by default in MVP */
  async saveHistory(toolSlug: string, inputs: object, outputs: object) {
    const tool = await this.getToolBySlug(toolSlug);
    if (!tool) return null;
    return this.prisma.calculatorHistory.create({
      data: { toolId: tool.id, inputs, outputs },
    });
  }
}
