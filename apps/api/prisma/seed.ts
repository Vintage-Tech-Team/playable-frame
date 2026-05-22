import { PrismaClient } from '@prisma/client';
import { TOOL_SEED_DATA } from '../src/modules/utilities/tool-seed.data';

const prisma = new PrismaClient();

async function main() {
  for (const tool of TOOL_SEED_DATA) {
    await prisma.tool.upsert({
      where: { slug: tool.slug },
      create: tool,
      update: tool,
    });
  }
  console.log(`Seeded ${TOOL_SEED_DATA.length} tools`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
