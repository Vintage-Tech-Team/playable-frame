import { Injectable } from '@nestjs/common';

/** Static sample holidays — replace with Nager.Date or similar when configured */
@Injectable()
export class HolidaysApiService {
  getHolidays(year: number, countryCode = 'US') {
    const holidays: Record<string, Array<{ date: string; name: string }>> = {
      US: [
        { date: `${year}-01-01`, name: "New Year's Day" },
        { date: `${year}-07-04`, name: 'Independence Day' },
        { date: `${year}-12-25`, name: 'Christmas Day' },
      ],
      GB: [
        { date: `${year}-01-01`, name: "New Year's Day" },
        { date: `${year}-12-25`, name: 'Christmas Day' },
        { date: `${year}-12-26`, name: 'Boxing Day' },
      ],
    };
    return {
      year,
      countryCode,
      holidays: holidays[countryCode] ?? holidays.US,
      note: 'Sample data — integrate public holiday API for production',
    };
  }
}
