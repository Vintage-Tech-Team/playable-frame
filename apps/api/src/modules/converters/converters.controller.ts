import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { ConvertersService } from './converters.service';

class ConvertDto {
  @IsString() fromUnit!: string;
  @IsString() toUnit!: string;
  @IsNumber() value!: number;
}

@ApiTags('converters')
@Controller('converters')
export class ConvertersController {
  constructor(private readonly converters: ConvertersService) {}

  @Get('presets')
  presets() {
    return this.converters.listPresets();
  }

  @Get('units')
  units() {
    return this.converters.listUnits();
  }

  @Post('convert')
  convert(@Body() dto: ConvertDto) {
    return this.converters.convert(dto.fromUnit, dto.toUnit, dto.value);
  }
}
