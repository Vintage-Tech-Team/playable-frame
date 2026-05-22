import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../../../shared/services/cache.service';

@Injectable()
export class GeocodingApiService {
  private readonly logger = new Logger(GeocodingApiService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly cache: CacheService,
  ) {}

  async searchCity(query: string) {
    const cacheKey = `geo:${query.toLowerCase()}`;
    const cached = await this.cache.get<unknown>(cacheKey);
    if (cached) return cached;

    const base = this.config.get(
      'NOMINATIM_API_URL',
      'https://nominatim.openstreetmap.org',
    );
    const url = `${base}/search?q=${encodeURIComponent(query)}&format=json&limit=5`;
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'EstateUtilPlatform/1.0' },
      });
      if (!res.ok) throw new Error(`Geocoding ${res.status}`);
      const data = await res.json();
      await this.cache.set(cacheKey, data, 86400);
      return data;
    } catch (e) {
      this.logger.warn(`Geocoding error: ${e}`);
      throw e;
    }
  }

  /** Haversine distance in km between two lat/lon points */
  distanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): { km: number; miles: number } {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const km = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return { km, miles: km * 0.621371 };
  }
}
