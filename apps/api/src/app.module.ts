import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CalculatorsModule } from './modules/calculators/calculators.module';
import { ConvertersModule } from './modules/converters/converters.module';
import { GlobalToolsModule } from './modules/global-tools/global-tools.module';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CalculatorsModule,
    GlobalToolsModule,
    ConvertersModule,
    UtilitiesModule,
  ],
})
export class AppModule {}
