import { Injectable } from '@nestjs/common';
import { CONVERTER_PRESETS, CONVERSION_UNITS, convertUnits } from '@estate/formulas';

@Injectable()
export class ConvertersService {
  listPresets() {
    return Object.entries(CONVERTER_PRESETS).map(([slug, preset]) => ({
      slug,
      ...preset,
      units: [preset.from, preset.to],
    }));
  }

  listUnits() {
    return Object.values(CONVERSION_UNITS).map((u) => ({
      id: u.id,
      label: u.label,
    }));
  }

  convert(fromUnit: string, toUnit: string, value: number) {
    const result = convertUnits(fromUnit, toUnit, value);
    return { fromUnit, toUnit, input: value, result };
  }
}
