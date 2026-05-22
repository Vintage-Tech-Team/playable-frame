import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalToolsService } from './global-tools.service';

@ApiTags('global-tools')
@Controller('global-tools')
export class GlobalToolsController {
  constructor(private readonly globalTools: GlobalToolsService) {}

  @Get('world-clock')
  worldClock() {
    return this.globalTools.worldClock();
  }

  @Post('timezone-compare')
  timezoneCompare(@Body() body: { zones: string[] }) {
    return this.globalTools.timezoneCompare(body.zones);
  }

  @Post('meeting-planner')
  meetingPlanner(@Body() body: { slots: { utcHour: number; zones: string[] }[] }) {
    return this.globalTools.meetingPlanner(body.slots);
  }

  @Post('date-difference')
  dateDifference(@Body() body: { startDate: string; endDate: string }) {
    return this.globalTools.dateDifference(body);
  }

  @Post('duration')
  duration(@Body() body: { hours: number; minutes: number; seconds: number }) {
    return this.globalTools.duration(body);
  }

  @Post('utc-convert')
  utcConvert(
    @Body()
    body: { dateTime: string; fromOffsetHours: number; toOffsetHours: number },
  ) {
    return this.globalTools.utcConvert(body);
  }

  @Get('currency/rates')
  currencyRates(@Query('base') base = 'USD') {
    return this.globalTools.currencyRates(base);
  }

  @Post('currency/convert')
  currencyConvert(@Body() body: { from: string; to: string; amount: number }) {
    return this.globalTools.currencyConvert(body.from, body.to, body.amount);
  }

  @Get('weather')
  weather(@Query('lat') lat: string, @Query('lon') lon: string) {
    return this.globalTools.getWeather(Number(lat), Number(lon));
  }

  @Get('cities/search')
  citySearch(@Query('q') q: string) {
    return this.globalTools.citySearch(q);
  }

  @Post('cities/distance')
  cityDistance(
    @Body()
    body: { lat1: number; lon1: number; lat2: number; lon2: number },
  ) {
    return this.globalTools.cityDistance(
      body.lat1,
      body.lon1,
      body.lat2,
      body.lon2,
    );
  }

  @Get('holidays')
  holidays(@Query('year') year: string, @Query('country') country = 'US') {
    return this.globalTools.holidayCalendar(Number(year) || new Date().getFullYear(), country);
  }
}
