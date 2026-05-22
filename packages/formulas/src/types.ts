export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface MortgageResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
  loanAmount: number;
  amortization: AmortizationRow[];
}

export interface CommissionResult {
  grossCommission: number;
  brokerageAmount: number;
  netCommission: number;
}
