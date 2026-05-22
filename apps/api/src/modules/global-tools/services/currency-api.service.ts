import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../../../shared/services/cache.service';

@Injectable()
export class CurrencyApiService {
  private readonly logger = new Logger(CurrencyApiService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly cache: CacheService,
  ) {}

  async getRates(base = 'USD') {
    const cacheKey = `fx:${base}`;
    const cached = await this.cache.get<Record<string, number>>(cacheKey);
    if (cached) return { base, rates: cached };

    const url = `${this.config.get('EXCHANGE_RATE_API_URL', 'https://api.exchangerate-api.com/v4/latest')}/${base}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`FX API ${res.status}`);
      const data = (await res.json()) as { rates: Record<string, number> };
      const ttl = Number(this.config.get('CACHE_TTL_SECONDS', 3600));
      await this.cache.set(cacheKey, data.rates, ttl);
      return { base, rates: data.rates };
    } catch (e) {
      this.logger.warn(`Currency API fallback: ${e}`);
      return {
        base,
        rates: { USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.36, AUD: 1.53 },
        fallback: true,
      };
    }
  }

  async convert(from: string, to: string, amount: number) {
    const { rates } = await this.getRates(from);
    const rate = (rates as Record<string, number>)[to];
    if (!rate) throw new Error(`Unknown currency: ${to}`);
    return { from, to, amount, result: amount * rate, rate };
  }
}
