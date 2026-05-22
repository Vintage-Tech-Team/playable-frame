import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CalculatorsService } from './calculators.service';
import {
  MortgageDto,
  CommissionDto,
  SellerNetDto,
  ClosingCostsDto,
  RoiDto,
  RentalIncomeDto,
  AffordabilityDto,
  DownPaymentDto,
  RefinanceDto,
  CashFlowDto,
  CapRateDto,
  MortgagePayoffDto,
  DtiDto,
  PricePerSqFtDto,
  AppreciationDto,
  InvestmentAnalyzerDto,
  OfferComparisonDto,
} from './dto';

@ApiTags('calculators')
@Controller('calculators')
export class CalculatorsController {
  constructor(private readonly calculators: CalculatorsService) {}

  @Post('mortgage')
  @ApiOperation({ summary: 'Mortgage calculator' })
  mortgage(@Body() dto: MortgageDto) {
    return this.calculators.mortgage(dto);
  }

  @Post('commission')
  commission(@Body() dto: CommissionDto) {
    return this.calculators.commission(dto);
  }

  @Post('seller-net')
  sellerNet(@Body() dto: SellerNetDto) {
    return this.calculators.sellerNet(dto);
  }

  @Post('closing-costs')
  closingCosts(@Body() dto: ClosingCostsDto) {
    return this.calculators.closingCosts(dto);
  }

  @Post('roi')
  roi(@Body() dto: RoiDto) {
    return this.calculators.roi(dto);
  }

  @Post('rental-income')
  rentalIncome(@Body() dto: RentalIncomeDto) {
    return this.calculators.rentalIncome(dto);
  }

  @Post('affordability')
  affordability(@Body() dto: AffordabilityDto) {
    return this.calculators.affordability(dto);
  }

  @Post('down-payment')
  downPayment(@Body() dto: DownPaymentDto) {
    return this.calculators.downPayment(dto);
  }

  @Post('refinance')
  refinance(@Body() dto: RefinanceDto) {
    return this.calculators.refinance(dto);
  }

  @Post('cash-flow')
  cashFlow(@Body() dto: CashFlowDto) {
    return this.calculators.cashFlow(dto);
  }

  @Post('cap-rate')
  capRate(@Body() dto: CapRateDto) {
    return this.calculators.capRate(dto);
  }

  @Post('mortgage-payoff')
  mortgagePayoff(@Body() dto: MortgagePayoffDto) {
    return this.calculators.mortgagePayoff(dto);
  }

  @Post('dti')
  dti(@Body() dto: DtiDto) {
    return this.calculators.dti(dto);
  }

  @Post('price-per-sqft')
  pricePerSqFt(@Body() dto: PricePerSqFtDto) {
    return this.calculators.pricePerSqFt(dto);
  }

  @Post('appreciation')
  appreciation(@Body() dto: AppreciationDto) {
    return this.calculators.appreciation(dto);
  }

  @Post('investment-analyzer')
  investmentAnalyzer(@Body() dto: InvestmentAnalyzerDto) {
    return this.calculators.investmentAnalyzer(dto);
  }

  @Post('offer-comparison')
  offerComparison(@Body() dto: OfferComparisonDto) {
    return this.calculators.offerComparison(dto);
  }
}
