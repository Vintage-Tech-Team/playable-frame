import { Module } from '@nestjs/common';
import { ConvertersController } from './converters.controller';
import { ConvertersService } from './converters.service';

@Module({
  controllers: [ConvertersController],
  providers: [ConvertersService],
})
export class ConvertersModule {}
