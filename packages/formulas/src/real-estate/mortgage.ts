import type { AmortizationRow, MortgageResult } from '../types';

/** Standard amortizing loan monthly payment: M = P * [r(1+r)^n] / [(1+r)^n - 1] */
export function calculateMortgage(input: {
  propertyPrice: number;
  interestRate: number;
  downPayment: number;
  loanTermYears: number;
}): MortgageResult {
  const loanAmount = input.propertyPrice - input.downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const months = input.loanTermYears * 12;

  if (loanAmount <= 0 || months <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalPaid: 0,
      loanAmount: Math.max(loanAmount, 0),
      amortization: [],
    };
  }

  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    monthlyPayment = (loanAmount * monthlyRate * factor) / (factor - 1);
  }

  const amortization: AmortizationRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance = Math.max(0, balance - principal);
    totalInterest += interest;
    amortization.push({
      month,
      payment: round(monthlyPayment),
      principal: round(principal),
      interest: round(interest),
      balance: round(balance),
    });
  }

  const totalPaid = monthlyPayment * months;
  return {
    monthlyPayment: round(monthlyPayment),
    totalInterest: round(totalInterest),
    totalPaid: round(totalPaid),
    loanAmount: round(loanAmount),
    amortization: amortization.slice(0, 12), // summary: first year
  };
}

function round(n: number, d = 2): number {
  const p = Math.pow(10, d);
  return Math.round(n * p) / p;
}
