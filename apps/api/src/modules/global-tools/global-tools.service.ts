import { Injectable } from '@nestjs/common';
import {
  calculateDateDifference,
  calculateDuration,
  convertUtcOffset,
} from '@estate/formulas';
import { CurrencyApiService } from './services/currency-api.service';
import { GeocodingApiService } from './services/geocoding-api.service';
import { HolidaysApiService } from './services/holidays-api.service';
import { WeatherApiService } from './services/weather-api.service';

const WORLD_CITIES = [
  { city: 'New York', timezone: 'America/New_York', offset: -5 },
  { city: 'London', timezone: 'Europe/London', offset: 0 },
  { city: 'Paris', timezone: 'Europe/Paris', offset: 1 },
  { city: 'Dubai', timezone: 'Asia/Dubai', offset: 4 },
  { city: 'Singapore', timezone: 'Asia/Singapore', offset: 8 },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', offset: 9 },
  { city: 'Sydney', timezone: 'Australia/Sydney', offset: 11 },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', offset: -8 },
];

@Injectable()
export class GlobalToolsService {
  constructor(
    private readonly currency: CurrencyApiService,
    private readonly weatherApi: WeatherApiService,
    private readonly geocoding: GeocodingApiService,
    private readonly holidays: HolidaysApiService,
  ) {}

  worldClock() {
    const now = new Date();
    return WORLD_CITIES.map((c) => ({
      ...c,
      localTime: new Date(now.getTime() + c.offset * 3600000).toISOString(),
    }));
  }

  timezoneCompare(zones: string[]) {
    const now = new Date();
    return zones.map((z) => {
      const city = WORLD_CITIES.find((c) => c.timezone === z);
      return {
        timezone: z,
        label: city?.city ?? z,
        offset: city?.offset ?? 0,
        localTime: city
          ? new Date(now.getTime() + city.offset * 3600000).toISOString()
          : now.toISOString(),
      };
    });
  }

  meetingPlanner(slots: { utcHour: number; zones: string[] }[]) {
    return slots.map((slot) => ({
      utcHour: slot.utcHour,
      localTimes: slot.zones.map((z) => {
        const city = WORLD_CITIES.find((c) => c.timezone === z);
        const offset = city?.offset ?? 0;
        return { timezone: z, localHour: (slot.utcHour + offset + 24) % 24 };
      }),
    }));
  }

  dateDifference(dto: Parameters<typeof calculateDateDifference>[0]) {
    return calculateDateDifference(dto);
  }

  duration(dto: Parameters<typeof calculateDuration>[0]) {
    return calculateDuration(dto);
  }

  utcConvert(dto: Parameters<typeof convertUtcOffset>[0]) {
    return convertUtcOffset(dto);
  }

  currencyConvert(from: string, to: string, amount: number) {
    return this.currency.convert(from, to, amount);
  }

  currencyRates(base: string) {
    return this.currency.getRates(base);
  }

  getWeather(lat: number, lon: number) {
    return this.weatherApi.lookup(lat, lon);
  }

  citySearch(query: string) {
    return this.geocoding.searchCity(query);
  }

  cityDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    return this.geocoding.distanceKm(lat1, lon1, lat2, lon2);
  }

  holidayCalendar(year: number, country: string) {
    return this.holidays.getHolidays(year, country);
  }
}
