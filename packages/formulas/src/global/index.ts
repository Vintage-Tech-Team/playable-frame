export function calculateDateDifference(input: {
  startDate: string;
  endDate: string;
}) {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);
  const diffMs = end.getTime() - start.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.437);
  const years = Math.floor(days / 365.25);
  return { days, weeks, months, years, totalMilliseconds: diffMs };
}

export function calculateDuration(input: {
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const totalSeconds = input.hours * 3600 + input.minutes * 60 + input.seconds;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return {
    totalSeconds,
    formatted: `${h}h ${m}m ${s}s`,
    hours: h,
    minutes: m,
    seconds: s,
  };
}

export function convertUtcOffset(input: {
  dateTime: string;
  fromOffsetHours: number;
  toOffsetHours: number;
}) {
  const d = new Date(input.dateTime);
  const utcMs = d.getTime() - input.fromOffsetHours * 3600000;
  const target = new Date(utcMs + input.toOffsetHours * 3600000);
  return {
    original: d.toISOString(),
    converted: target.toISOString(),
    fromOffset: input.fromOffsetHours,
    toOffset: input.toOffsetHours,
  };
}
