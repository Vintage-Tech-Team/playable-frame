export type ConversionCategory =
  | 'area'
  | 'length'
  | 'weight'
  | 'temperature'
  | 'volume'
  | 'distance'
  | 'height';

export interface ConversionUnit {
  id: string;
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const identity = (v: number) => v;

/** Base units: sq ft, feet, kg, celsius, liters, miles, feet (height) */
export const CONVERSION_UNITS: Record<string, ConversionUnit> = {
  sqft: { id: 'sqft', label: 'Square Feet', toBase: identity, fromBase: identity },
  sqm: {
    id: 'sqm',
    label: 'Square Meters',
    toBase: (v) => v * 10.7639,
    fromBase: (v) => v / 10.7639,
  },
  acres: {
    id: 'acres',
    label: 'Acres',
    toBase: (v) => v * 43560,
    fromBase: (v) => v / 43560,
  },
  hectares: {
    id: 'hectares',
    label: 'Hectares',
    toBase: (v) => v * 107639,
    fromBase: (v) => v / 107639,
  },
  feet: { id: 'feet', label: 'Feet', toBase: identity, fromBase: identity },
  meters: {
    id: 'meters',
    label: 'Meters',
    toBase: (v) => v * 3.28084,
    fromBase: (v) => v / 3.28084,
  },
  inches: {
    id: 'inches',
    label: 'Inches',
    toBase: (v) => v / 12,
    fromBase: (v) => v * 12,
  },
  cm: {
    id: 'cm',
    label: 'Centimeters',
    toBase: (v) => v / 30.48,
    fromBase: (v) => v * 30.48,
  },
  kg: { id: 'kg', label: 'Kilograms', toBase: identity, fromBase: identity },
  lbs: {
    id: 'lbs',
    label: 'Pounds',
    toBase: (v) => v * 0.453592,
    fromBase: (v) => v / 0.453592,
  },
  celsius: { id: 'celsius', label: 'Celsius', toBase: identity, fromBase: identity },
  fahrenheit: {
    id: 'fahrenheit',
    label: 'Fahrenheit',
    toBase: (v) => (v - 32) * (5 / 9),
    fromBase: (v) => v * (9 / 5) + 32,
  },
  kelvin: {
    id: 'kelvin',
    label: 'Kelvin',
    toBase: (v) => v - 273.15,
    fromBase: (v) => v + 273.15,
  },
  liters: { id: 'liters', label: 'Liters', toBase: identity, fromBase: identity },
  gallons: {
    id: 'gallons',
    label: 'US Gallons',
    toBase: (v) => v * 3.78541,
    fromBase: (v) => v / 3.78541,
  },
  miles: { id: 'miles', label: 'Miles', toBase: identity, fromBase: identity },
  km: {
    id: 'km',
    label: 'Kilometers',
    toBase: (v) => v * 0.621371,
    fromBase: (v) => v / 0.621371,
  },
};

export function convertUnits(fromUnitId: string, toUnitId: string, value: number): number {
  const from = CONVERSION_UNITS[fromUnitId];
  const to = CONVERSION_UNITS[toUnitId];
  if (!from || !to) throw new Error(`Unknown unit: ${fromUnitId} or ${toUnitId}`);
  const base = from.toBase(value);
  return to.fromBase(base);
}

export const CONVERTER_PRESETS: Record<
  string,
  { from: string; to: string; label: string; category: ConversionCategory }
> = {
  'sqft-sqm': { from: 'sqft', to: 'sqm', label: 'Sq Ft ↔ Sq M', category: 'area' },
  'acres-hectares': { from: 'acres', to: 'hectares', label: 'Acres ↔ Hectares', category: 'area' },
  'feet-meters': { from: 'feet', to: 'meters', label: 'Feet ↔ Metres', category: 'length' },
  'inches-cm': { from: 'inches', to: 'cm', label: 'Inches ↔ CM', category: 'length' },
  weight: { from: 'kg', to: 'lbs', label: 'Weight', category: 'weight' },
  temperature: { from: 'celsius', to: 'fahrenheit', label: 'Temperature', category: 'temperature' },
  volume: { from: 'liters', to: 'gallons', label: 'Volume', category: 'volume' },
  distance: { from: 'miles', to: 'km', label: 'Distance', category: 'distance' },
  height: { from: 'feet', to: 'meters', label: 'Height', category: 'height' },
  'area-general': { from: 'sqft', to: 'acres', label: 'Area', category: 'area' },
};
