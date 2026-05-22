import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../../../shared/services/cache.service';

@Injectable()
export class WeatherApiService {
  private readonly logger = new Logger(WeatherApiService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly cache: CacheService,
  ) {}

  async lookup(latitude: number, longitude: number) {
    const cacheKey = `weather:${latitude}:${longitude}`;
    const cached = await this.cache.get<unknown>(cacheKey);
    if (cached) return cached;

    const base = this.config.get(
      'OPEN_METEO_API_URL',
      'https://api.open-meteo.com/v1/forecast',
    );
    const url = `${base}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Weather API ${res.status}`);
      const data = await res.json();
      const ttl = Number(this.config.get('CACHE_TTL_SECONDS', 1800));
      await this.cache.set(cacheKey, data, ttl);
      return data;
    } catch (e) {
      this.logger.warn(`Weather API error: ${e}`);
      throw e;
    }
  }
}
