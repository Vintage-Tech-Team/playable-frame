import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CacheService {
  constructor(private readonly prisma: PrismaService) {}

  async get<T>(key: string): Promise<T | null> {
    const row = await this.prisma.apiCache.findUnique({ where: { cacheKey: key } });
    if (!row || row.expiresAt < new Date()) {
      if (row) await this.prisma.apiCache.delete({ where: { cacheKey: key } }).catch(() => {});
      return null;
    }
    return row.payload as T;
  }

  async set(key: string, payload: unknown, ttlSeconds: number): Promise<void> {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    await this.prisma.apiCache.upsert({
      where: { cacheKey: key },
      create: { cacheKey: key, payload: payload as object, expiresAt },
      update: { payload: payload as object, expiresAt },
    });
  }
}
