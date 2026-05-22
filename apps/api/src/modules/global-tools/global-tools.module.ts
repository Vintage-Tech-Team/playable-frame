import { Module } from '@nestjs/common';
import { CacheService } from '../../shared/services/cache.service';
import { GlobalToolsController } from './global-tools.controller';
import { GlobalToolsService } from './global-tools.service';
import { CurrencyApiService } from './services/currency-api.service';
import { GeocodingApiService } from './services/geocoding-api.service';
import { HolidaysApiService } from './services/holidays-api.service';
import { WeatherApiService } from './services/weather-api.service';

@Module({
  controllers: [GlobalToolsController],
  providers: [
    GlobalToolsService,
    CurrencyApiService,
    WeatherApiService,
    GeocodingApiService,
    HolidaysApiService,
    CacheService,
  ],
})
export class GlobalToolsModule {}
