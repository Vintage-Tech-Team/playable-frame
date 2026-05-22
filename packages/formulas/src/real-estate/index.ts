export { calculateMortgage } from './mortgage';

export function calculateCommission(input: {
  salePrice: number;
  commissionPercent: number;
  brokerageSplitPercent: number;
}) {
  const grossCommission = input.salePrice * (input.commissionPercent / 100);
  const brokerageAmount = grossCommission * (input.brokerageSplitPercent / 100);
  const netCommission = grossCommission - brokerageAmount;
  return { grossCommission, brokerageAmount, netCommission };
}

/** Seller net sheet — placeholder: client may refine closing cost line items */
export function calculateSellerNet(input: {
  salePrice: number;
  mortgagePayoff: number;
  commissionPercent: number;
  closingCosts: number;
  repairs: number;
  otherDeductions: number;
}) {
  const commission = input.salePrice * (input.commissionPercent / 100);
  const totalDeductions =
    input.mortgagePayoff +
    commission +
    input.closingCosts +
    input.repairs +
    input.otherDeductions;
  const netProceeds = input.salePrice - totalDeductions;
  return {
    salePrice: input.salePrice,
    commission,
    totalDeductions,
    netProceeds,
    breakdown: {
      mortgagePayoff: input.mortgagePayoff,
      commission,
      closingCosts: input.closingCosts,
      repairs: input.repairs,
      otherDeductions: input.otherDeductions,
    },
  };
}

export function calculateClosingCosts(input: {
  purchasePrice: number;
  loanAmount: number;
  lenderFeesPercent: number;
  titleEscrowFlat: number;
  prepaidTaxes: number;
  prepaidInsurance: number;
}) {
  const lenderFees = input.loanAmount * (input.lenderFeesPercent / 100);
  const total =
    lenderFees +
    input.titleEscrowFlat +
    input.prepaidTaxes +
    input.prepaidInsurance;
  return {
    lenderFees,
    titleEscrow: input.titleEscrowFlat,
    prepaidTaxes: input.prepaidTaxes,
    prepaidInsurance: input.prepaidInsurance,
    totalClosingCosts: total,
    percentOfPrice: input.purchasePrice > 0 ? (total / input.purchasePrice) * 100 : 0,
  };
}

export function calculateROI(input: {
  initialInvestment: number;
  annualCashFlow: number;
  holdingYears: number;
  exitValue: number;
}) {
  const totalCashFlow = input.annualCashFlow * input.holdingYears;
  const totalReturn = totalCashFlow + input.exitValue - input.initialInvestment;
  const roiPercent =
    input.initialInvestment > 0 ? (totalReturn / input.initialInvestment) * 100 : 0;
  const annualized =
    input.holdingYears > 0
      ? (Math.pow(1 + roiPercent / 100, 1 / input.holdingYears) - 1) * 100
      : 0;
  return { totalReturn, roiPercent, annualizedRoiPercent: annualized, totalCashFlow };
}

export function calculateRentalIncome(input: {
  monthlyRent: number;
  vacancyRatePercent: number;
  operatingExpensesMonthly: number;
}) {
  const grossAnnual = input.monthlyRent * 12;
  const vacancyLoss = grossAnnual * (input.vacancyRatePercent / 100);
  const effectiveGross = grossAnnual - vacancyLoss;
  const operatingAnnual = input.operatingExpensesMonthly * 12;
  const netOperatingIncome = effectiveGross - operatingAnnual;
  return {
    grossAnnualRent: grossAnnual,
    vacancyLoss,
    effectiveGrossIncome: effectiveGross,
    netOperatingIncome,
    monthlyNet: netOperatingIncome / 12,
  };
}

export function calculateAffordability(input: {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  maxDtiPercent: number;
}) {
  const maxMonthlyPayment =
    (input.annualIncome / 12) * (input.maxDtiPercent / 100) - input.monthlyDebts;
  const monthlyRate = input.interestRate / 100 / 12;
  const months = input.loanTermYears * 12;
  let maxLoan = 0;
  if (maxMonthlyPayment > 0 && months > 0) {
    if (monthlyRate === 0) {
      maxLoan = maxMonthlyPayment * months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);
      maxLoan = (maxMonthlyPayment * (factor - 1)) / (monthlyRate * factor);
    }
  }
  const maxHomePrice = maxLoan + input.downPayment;
  return { maxMonthlyPayment, maxLoanAmount: maxLoan, maxHomePrice };
}

export function calculateDownPayment(input: {
  homePrice: number;
  downPaymentPercent: number;
}) {
  const amount = input.homePrice * (input.downPaymentPercent / 100);
  const loanAmount = input.homePrice - amount;
  return {
    downPaymentAmount: amount,
    loanAmount,
    downPaymentPercent: input.downPaymentPercent,
  };
}

export function calculateRefinance(input: {
  currentBalance: number;
  currentRate: number;
  newRate: number;
  remainingYears: number;
  newTermYears: number;
  closingCosts: number;
}) {
  const calcPayment = (principal: number, rate: number, years: number) => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (n <= 0 || principal <= 0) return 0;
    if (r === 0) return principal / n;
    const f = Math.pow(1 + r, n);
    return (principal * r * f) / (f - 1);
  };
  const currentPayment = calcPayment(input.currentBalance, input.currentRate, input.remainingYears);
  const newPayment = calcPayment(input.currentBalance, input.newRate, input.newTermYears);
  const monthlySavings = currentPayment - newPayment;
  const breakEvenMonths =
    monthlySavings > 0 ? Math.ceil(input.closingCosts / monthlySavings) : null;
  return {
    currentMonthlyPayment: currentPayment,
    newMonthlyPayment: newPayment,
    monthlySavings,
    breakEvenMonths,
    lifetimeInterestSavings: (currentPayment - newPayment) * input.newTermYears * 12,
  };
}

export function calculateCashFlow(input: {
  monthlyRent: number;
  mortgagePayment: number;
  propertyTaxMonthly: number;
  insuranceMonthly: number;
  maintenanceMonthly: number;
  hoaMonthly: number;
  vacancyPercent: number;
}) {
  const effectiveRent = input.monthlyRent * (1 - input.vacancyPercent / 100);
  const expenses =
    input.mortgagePayment +
    input.propertyTaxMonthly +
    input.insuranceMonthly +
    input.maintenanceMonthly +
    input.hoaMonthly;
  const monthlyCashFlow = effectiveRent - expenses;
  return {
    effectiveRent,
    totalExpenses: expenses,
    monthlyCashFlow,
    annualCashFlow: monthlyCashFlow * 12,
  };
}

export function calculateCapRate(input: {
  netOperatingIncomeAnnual: number;
  propertyValue: number;
}) {
  const capRate =
    input.propertyValue > 0 ? (input.netOperatingIncomeAnnual / input.propertyValue) * 100 : 0;
  return { capRatePercent: capRate, noi: input.netOperatingIncomeAnnual };
}

export function calculateMortgagePayoff(input: {
  balance: number;
  annualRate: number;
  extraMonthlyPayment: number;
}) {
  const monthlyRate = input.annualRate / 100 / 12;
  let balance = input.balance;
  let months = 0;
  let totalInterest = 0;
  const basePayment =
    monthlyRate === 0
      ? balance / 360
      : (balance * monthlyRate * Math.pow(1 + monthlyRate, 360)) /
        (Math.pow(1 + monthlyRate, 360) - 1);
  const payment = basePayment + input.extraMonthlyPayment;
  while (balance > 0 && months < 600) {
    const interest = balance * monthlyRate;
    const principal = Math.min(balance, payment - interest);
    balance -= principal;
    totalInterest += interest;
    months++;
  }
  return {
    monthsToPayoff: months,
    yearsToPayoff: months / 12,
    totalInterestPaid: totalInterest,
    standardMonthsWithoutExtra: 360,
  };
}

export function calculateDTI(input: {
  grossMonthlyIncome: number;
  housingPayment: number;
  monthlyDebts: number;
}) {
  const frontEnd =
    input.grossMonthlyIncome > 0
      ? (input.housingPayment / input.grossMonthlyIncome) * 100
      : 0;
  const backEnd =
    input.grossMonthlyIncome > 0
      ? ((input.housingPayment + input.monthlyDebts) / input.grossMonthlyIncome) * 100
      : 0;
  return { frontEndDtiPercent: frontEnd, backEndDtiPercent: backEnd };
}

export function calculatePricePerSqFt(input: {
  price: number;
  squareFeet: number;
}) {
  const pricePerSqFt = input.squareFeet > 0 ? input.price / input.squareFeet : 0;
  return { pricePerSqFt, totalPrice: input.price, squareFeet: input.squareFeet };
}

export function calculateAppreciation(input: {
  purchasePrice: number;
  currentValue: number;
  yearsHeld: number;
}) {
  const totalGain = input.currentValue - input.purchasePrice;
  const totalGainPercent =
    input.purchasePrice > 0 ? (totalGain / input.purchasePrice) * 100 : 0;
  const annualized =
    input.yearsHeld > 0 && input.purchasePrice > 0
      ? (Math.pow(input.currentValue / input.purchasePrice, 1 / input.yearsHeld) - 1) * 100
      : 0;
  return { totalGain, totalGainPercent, annualizedAppreciationPercent: annualized };
}

export function calculateInvestmentAnalyzer(input: {
  purchasePrice: number;
  downPayment: number;
  closingCosts: number;
  monthlyRent: number;
  monthlyExpenses: number;
  annualAppreciationPercent: number;
  holdingYears: number;
}) {
  const cashInvested = input.downPayment + input.closingCosts;
  const monthlyCashFlow = input.monthlyRent - input.monthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const futureValue =
    input.purchasePrice * Math.pow(1 + input.annualAppreciationPercent / 100, input.holdingYears);
  const equityGain = futureValue - input.purchasePrice;
  const totalReturn = annualCashFlow * input.holdingYears + equityGain;
  const cashOnCash =
    cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
  return {
    cashInvested,
    monthlyCashFlow,
    annualCashFlow,
    cashOnCashReturnPercent: cashOnCash,
    projectedValue: futureValue,
    equityGain,
    totalReturn,
  };
}

export function compareOffers(input: {
  offers: Array<{
    label: string;
    price: number;
    sellerCredits: number;
    closingDays: number;
    contingencies: number;
  }>;
}) {
  const scored = input.offers.map((o) => {
    // Weighted score — business rules may vary per client
    const netPrice = o.price - o.sellerCredits;
    const speedScore = Math.max(0, 30 - o.contingencies) + Math.max(0, 45 - o.closingDays);
    const score = netPrice + speedScore * 100;
    return { ...o, netPrice, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return { rankedOffers: scored, recommended: scored[0]?.label ?? null };
}
