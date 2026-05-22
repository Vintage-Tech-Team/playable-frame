import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class MortgageDto {
  @ApiProperty() @IsNumber() @Min(0) propertyPrice!: number;
  @ApiProperty() @IsNumber() @Min(0) interestRate!: number;
  @ApiProperty() @IsNumber() @Min(0) downPayment!: number;
  @ApiProperty() @IsNumber() @Min(1) loanTermYears!: number;
}

export class CommissionDto {
  @ApiProperty() @IsNumber() @Min(0) salePrice!: number;
  @ApiProperty() @IsNumber() @Min(0) commissionPercent!: number;
  @ApiProperty() @IsNumber() @Min(0) brokerageSplitPercent!: number;
}

export class SellerNetDto {
  @ApiProperty() @IsNumber() salePrice!: number;
  @ApiProperty() @IsNumber() mortgagePayoff!: number;
  @ApiProperty() @IsNumber() commissionPercent!: number;
  @ApiProperty() @IsNumber() closingCosts!: number;
  @ApiProperty() @IsNumber() repairs!: number;
  @ApiProperty() @IsNumber() otherDeductions!: number;
}

export class ClosingCostsDto {
  @ApiProperty() @IsNumber() purchasePrice!: number;
  @ApiProperty() @IsNumber() loanAmount!: number;
  @ApiProperty() @IsNumber() lenderFeesPercent!: number;
  @ApiProperty() @IsNumber() titleEscrowFlat!: number;
  @ApiProperty() @IsNumber() prepaidTaxes!: number;
  @ApiProperty() @IsNumber() prepaidInsurance!: number;
}

export class RoiDto {
  @ApiProperty() @IsNumber() initialInvestment!: number;
  @ApiProperty() @IsNumber() annualCashFlow!: number;
  @ApiProperty() @IsNumber() holdingYears!: number;
  @ApiProperty() @IsNumber() exitValue!: number;
}

export class RentalIncomeDto {
  @ApiProperty() @IsNumber() monthlyRent!: number;
  @ApiProperty() @IsNumber() vacancyRatePercent!: number;
  @ApiProperty() @IsNumber() operatingExpensesMonthly!: number;
}

export class AffordabilityDto {
  @ApiProperty() @IsNumber() annualIncome!: number;
  @ApiProperty() @IsNumber() monthlyDebts!: number;
  @ApiProperty() @IsNumber() downPayment!: number;
  @ApiProperty() @IsNumber() interestRate!: number;
  @ApiProperty() @IsNumber() loanTermYears!: number;
  @ApiProperty() @IsNumber() maxDtiPercent!: number;
}

export class DownPaymentDto {
  @ApiProperty() @IsNumber() homePrice!: number;
  @ApiProperty() @IsNumber() downPaymentPercent!: number;
}

export class RefinanceDto {
  @ApiProperty() @IsNumber() currentBalance!: number;
  @ApiProperty() @IsNumber() currentRate!: number;
  @ApiProperty() @IsNumber() newRate!: number;
  @ApiProperty() @IsNumber() remainingYears!: number;
  @ApiProperty() @IsNumber() newTermYears!: number;
  @ApiProperty() @IsNumber() closingCosts!: number;
}

export class CashFlowDto {
  @ApiProperty() @IsNumber() monthlyRent!: number;
  @ApiProperty() @IsNumber() mortgagePayment!: number;
  @ApiProperty() @IsNumber() propertyTaxMonthly!: number;
  @ApiProperty() @IsNumber() insuranceMonthly!: number;
  @ApiProperty() @IsNumber() maintenanceMonthly!: number;
  @ApiProperty() @IsNumber() hoaMonthly!: number;
  @ApiProperty() @IsNumber() vacancyPercent!: number;
}

export class CapRateDto {
  @ApiProperty() @IsNumber() netOperatingIncomeAnnual!: number;
  @ApiProperty() @IsNumber() propertyValue!: number;
}

export class MortgagePayoffDto {
  @ApiProperty() @IsNumber() balance!: number;
  @ApiProperty() @IsNumber() annualRate!: number;
  @ApiProperty() @IsNumber() extraMonthlyPayment!: number;
}

export class DtiDto {
  @ApiProperty() @IsNumber() grossMonthlyIncome!: number;
  @ApiProperty() @IsNumber() housingPayment!: number;
  @ApiProperty() @IsNumber() monthlyDebts!: number;
}

export class PricePerSqFtDto {
  @ApiProperty() @IsNumber() price!: number;
  @ApiProperty() @IsNumber() squareFeet!: number;
}

export class AppreciationDto {
  @ApiProperty() @IsNumber() purchasePrice!: number;
  @ApiProperty() @IsNumber() currentValue!: number;
  @ApiProperty() @IsNumber() yearsHeld!: number;
}

export class InvestmentAnalyzerDto {
  @ApiProperty() @IsNumber() purchasePrice!: number;
  @ApiProperty() @IsNumber() downPayment!: number;
  @ApiProperty() @IsNumber() closingCosts!: number;
  @ApiProperty() @IsNumber() monthlyRent!: number;
  @ApiProperty() @IsNumber() monthlyExpenses!: number;
  @ApiProperty() @IsNumber() annualAppreciationPercent!: number;
  @ApiProperty() @IsNumber() holdingYears!: number;
}

class OfferItemDto {
  @ApiProperty() @IsString() label!: string;
  @ApiProperty() @IsNumber() price!: number;
  @ApiProperty() @IsNumber() sellerCredits!: number;
  @ApiProperty() @IsNumber() closingDays!: number;
  @ApiProperty() @IsNumber() contingencies!: number;
}

export class OfferComparisonDto {
  @ApiProperty({ type: [OfferItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OfferItemDto)
  offers!: OfferItemDto[];
}
