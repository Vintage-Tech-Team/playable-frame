import { Injectable } from '@nestjs/common';
import * as formulas from '@estate/formulas';

@Injectable()
export class CalculatorsService {
  mortgage(dto: Parameters<typeof formulas.calculateMortgage>[0]) {
    return formulas.calculateMortgage(dto);
  }

  commission(dto: Parameters<typeof formulas.calculateCommission>[0]) {
    return formulas.calculateCommission(dto);
  }

  sellerNet(dto: Parameters<typeof formulas.calculateSellerNet>[0]) {
    return formulas.calculateSellerNet(dto);
  }

  closingCosts(dto: Parameters<typeof formulas.calculateClosingCosts>[0]) {
    return formulas.calculateClosingCosts(dto);
  }

  roi(dto: Parameters<typeof formulas.calculateROI>[0]) {
    return formulas.calculateROI(dto);
  }

  rentalIncome(dto: Parameters<typeof formulas.calculateRentalIncome>[0]) {
    return formulas.calculateRentalIncome(dto);
  }

  affordability(dto: Parameters<typeof formulas.calculateAffordability>[0]) {
    return formulas.calculateAffordability(dto);
  }

  downPayment(dto: Parameters<typeof formulas.calculateDownPayment>[0]) {
    return formulas.calculateDownPayment(dto);
  }

  refinance(dto: Parameters<typeof formulas.calculateRefinance>[0]) {
    return formulas.calculateRefinance(dto);
  }

  cashFlow(dto: Parameters<typeof formulas.calculateCashFlow>[0]) {
    return formulas.calculateCashFlow(dto);
  }

  capRate(dto: Parameters<typeof formulas.calculateCapRate>[0]) {
    return formulas.calculateCapRate(dto);
  }

  mortgagePayoff(dto: Parameters<typeof formulas.calculateMortgagePayoff>[0]) {
    return formulas.calculateMortgagePayoff(dto);
  }

  dti(dto: Parameters<typeof formulas.calculateDTI>[0]) {
    return formulas.calculateDTI(dto);
  }

  pricePerSqFt(dto: Parameters<typeof formulas.calculatePricePerSqFt>[0]) {
    return formulas.calculatePricePerSqFt(dto);
  }

  appreciation(dto: Parameters<typeof formulas.calculateAppreciation>[0]) {
    return formulas.calculateAppreciation(dto);
  }

  investmentAnalyzer(dto: Parameters<typeof formulas.calculateInvestmentAnalyzer>[0]) {
    return formulas.calculateInvestmentAnalyzer(dto);
  }

  offerComparison(dto: Parameters<typeof formulas.compareOffers>[0]) {
    return formulas.compareOffers(dto);
  }
}
