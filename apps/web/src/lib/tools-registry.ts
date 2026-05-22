import { z } from "zod";

export type FieldType = "number" | "text" | "date" | "select";

export interface ToolField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string | number;
  options?: { label: string; value: string }[];
  step?: string;
}

export interface ToolDefinition {
  slug: string;
  category: "calculators" | "global" | "converters";
  title: string;
  description: string;
  apiPath: string;
  method?: "GET" | "POST";
  fields: ToolField[];
  schema: z.ZodType<Record<string, unknown>>;
  resultKeys?: string[];
  chartKey?: string;
}

const num = z.coerce.number();

export const CALCULATOR_TOOLS: ToolDefinition[] = [
  {
    slug: "mortgage",
    category: "calculators",
    title: "Mortgage Calculator",
    description: "Monthly payment, total interest, and amortization summary.",
    apiPath: "/calculators/mortgage",
    fields: [
      { name: "propertyPrice", label: "Property Price ($)", type: "number", defaultValue: 450000 },
      { name: "interestRate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, step: "0.01" },
      { name: "downPayment", label: "Down Payment ($)", type: "number", defaultValue: 90000 },
      { name: "loanTermYears", label: "Loan Term (years)", type: "number", defaultValue: 30 },
    ],
    schema: z.object({
      propertyPrice: num,
      interestRate: num,
      downPayment: num,
      loanTermYears: num,
    }),
    resultKeys: ["monthlyPayment", "totalInterest", "totalPaid", "loanAmount"],
    chartKey: "amortization",
  },
  {
    slug: "commission",
    category: "calculators",
    title: "Commission Calculator",
    description: "Gross and net commission after brokerage split.",
    apiPath: "/calculators/commission",
    fields: [
      { name: "salePrice", label: "Sale Price ($)", type: "number", defaultValue: 500000 },
      { name: "commissionPercent", label: "Commission (%)", type: "number", defaultValue: 5 },
      { name: "brokerageSplitPercent", label: "Brokerage Split (%)", type: "number", defaultValue: 50 },
    ],
    schema: z.object({ salePrice: num, commissionPercent: num, brokerageSplitPercent: num }),
    resultKeys: ["grossCommission", "brokerageAmount", "netCommission"],
  },
  {
    slug: "seller-net",
    category: "calculators",
    title: "Seller Net Sheet",
    description: "Estimate net proceeds after deductions.",
    apiPath: "/calculators/seller-net",
    fields: [
      { name: "salePrice", label: "Sale Price ($)", type: "number", defaultValue: 500000 },
      { name: "mortgagePayoff", label: "Mortgage Payoff ($)", type: "number", defaultValue: 200000 },
      { name: "commissionPercent", label: "Commission (%)", type: "number", defaultValue: 5 },
      { name: "closingCosts", label: "Closing Costs ($)", type: "number", defaultValue: 8000 },
      { name: "repairs", label: "Repairs ($)", type: "number", defaultValue: 3000 },
      { name: "otherDeductions", label: "Other Deductions ($)", type: "number", defaultValue: 0 },
    ],
    schema: z.object({
      salePrice: num,
      mortgagePayoff: num,
      commissionPercent: num,
      closingCosts: num,
      repairs: num,
      otherDeductions: num,
    }),
    resultKeys: ["netProceeds", "totalDeductions", "commission"],
  },
  {
    slug: "closing-costs",
    category: "calculators",
    title: "Closing Cost Calculator",
    description: "Estimate buyer closing costs.",
    apiPath: "/calculators/closing-costs",
    fields: [
      { name: "purchasePrice", label: "Purchase Price ($)", type: "number", defaultValue: 400000 },
      { name: "loanAmount", label: "Loan Amount ($)", type: "number", defaultValue: 320000 },
      { name: "lenderFeesPercent", label: "Lender Fees (%)", type: "number", defaultValue: 1 },
      { name: "titleEscrowFlat", label: "Title & Escrow ($)", type: "number", defaultValue: 2500 },
      { name: "prepaidTaxes", label: "Prepaid Taxes ($)", type: "number", defaultValue: 2000 },
      { name: "prepaidInsurance", label: "Prepaid Insurance ($)", type: "number", defaultValue: 1200 },
    ],
    schema: z.object({
      purchasePrice: num,
      loanAmount: num,
      lenderFeesPercent: num,
      titleEscrowFlat: num,
      prepaidTaxes: num,
      prepaidInsurance: num,
    }),
    resultKeys: ["totalClosingCosts", "lenderFees", "percentOfPrice"],
  },
  {
    slug: "roi",
    category: "calculators",
    title: "ROI Calculator",
    description: "Return on investment over holding period.",
    apiPath: "/calculators/roi",
    fields: [
      { name: "initialInvestment", label: "Initial Investment ($)", type: "number", defaultValue: 100000 },
      { name: "annualCashFlow", label: "Annual Cash Flow ($)", type: "number", defaultValue: 12000 },
      { name: "holdingYears", label: "Holding Years", type: "number", defaultValue: 5 },
      { name: "exitValue", label: "Exit Value ($)", type: "number", defaultValue: 150000 },
    ],
    schema: z.object({ initialInvestment: num, annualCashFlow: num, holdingYears: num, exitValue: num }),
    resultKeys: ["roiPercent", "annualizedRoiPercent", "totalReturn"],
  },
  {
    slug: "rental-income",
    category: "calculators",
    title: "Rental Income Estimator",
    description: "Effective gross income and NOI.",
    apiPath: "/calculators/rental-income",
    fields: [
      { name: "monthlyRent", label: "Monthly Rent ($)", type: "number", defaultValue: 2500 },
      { name: "vacancyRatePercent", label: "Vacancy Rate (%)", type: "number", defaultValue: 5 },
      { name: "operatingExpensesMonthly", label: "Operating Expenses/mo ($)", type: "number", defaultValue: 800 },
    ],
    schema: z.object({ monthlyRent: num, vacancyRatePercent: num, operatingExpensesMonthly: num }),
    resultKeys: ["netOperatingIncome", "effectiveGrossIncome", "monthlyNet"],
  },
  {
    slug: "affordability",
    category: "calculators",
    title: "Affordability Calculator",
    description: "Maximum home price from income and DTI.",
    apiPath: "/calculators/affordability",
    fields: [
      { name: "annualIncome", label: "Annual Income ($)", type: "number", defaultValue: 120000 },
      { name: "monthlyDebts", label: "Monthly Debts ($)", type: "number", defaultValue: 500 },
      { name: "downPayment", label: "Down Payment ($)", type: "number", defaultValue: 50000 },
      { name: "interestRate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5 },
      { name: "loanTermYears", label: "Loan Term (years)", type: "number", defaultValue: 30 },
      { name: "maxDtiPercent", label: "Max DTI (%)", type: "number", defaultValue: 43 },
    ],
    schema: z.object({
      annualIncome: num,
      monthlyDebts: num,
      downPayment: num,
      interestRate: num,
      loanTermYears: num,
      maxDtiPercent: num,
    }),
    resultKeys: ["maxHomePrice", "maxLoanAmount", "maxMonthlyPayment"],
  },
  {
    slug: "down-payment",
    category: "calculators",
    title: "Down Payment Calculator",
    description: "Down payment amount and loan balance.",
    apiPath: "/calculators/down-payment",
    fields: [
      { name: "homePrice", label: "Home Price ($)", type: "number", defaultValue: 400000 },
      { name: "downPaymentPercent", label: "Down Payment (%)", type: "number", defaultValue: 20 },
    ],
    schema: z.object({ homePrice: num, downPaymentPercent: num }),
    resultKeys: ["downPaymentAmount", "loanAmount"],
  },
  {
    slug: "refinance",
    category: "calculators",
    title: "Mortgage Refinance Calculator",
    description: "Compare payments and break-even.",
    apiPath: "/calculators/refinance",
    fields: [
      { name: "currentBalance", label: "Current Balance ($)", type: "number", defaultValue: 300000 },
      { name: "currentRate", label: "Current Rate (%)", type: "number", defaultValue: 7 },
      { name: "newRate", label: "New Rate (%)", type: "number", defaultValue: 5.5 },
      { name: "remainingYears", label: "Remaining Years", type: "number", defaultValue: 28 },
      { name: "newTermYears", label: "New Term (years)", type: "number", defaultValue: 30 },
      { name: "closingCosts", label: "Closing Costs ($)", type: "number", defaultValue: 4000 },
    ],
    schema: z.object({
      currentBalance: num,
      currentRate: num,
      newRate: num,
      remainingYears: num,
      newTermYears: num,
      closingCosts: num,
    }),
    resultKeys: ["monthlySavings", "breakEvenMonths", "newMonthlyPayment"],
  },
  {
    slug: "cash-flow",
    category: "calculators",
    title: "Cash Flow Calculator",
    description: "Monthly and annual rental cash flow.",
    apiPath: "/calculators/cash-flow",
    fields: [
      { name: "monthlyRent", label: "Monthly Rent ($)", type: "number", defaultValue: 2200 },
      { name: "mortgagePayment", label: "Mortgage ($)", type: "number", defaultValue: 1400 },
      { name: "propertyTaxMonthly", label: "Property Tax ($)", type: "number", defaultValue: 350 },
      { name: "insuranceMonthly", label: "Insurance ($)", type: "number", defaultValue: 120 },
      { name: "maintenanceMonthly", label: "Maintenance ($)", type: "number", defaultValue: 150 },
      { name: "hoaMonthly", label: "HOA ($)", type: "number", defaultValue: 0 },
      { name: "vacancyPercent", label: "Vacancy (%)", type: "number", defaultValue: 5 },
    ],
    schema: z.object({
      monthlyRent: num,
      mortgagePayment: num,
      propertyTaxMonthly: num,
      insuranceMonthly: num,
      maintenanceMonthly: num,
      hoaMonthly: num,
      vacancyPercent: num,
    }),
    resultKeys: ["monthlyCashFlow", "annualCashFlow", "totalExpenses"],
  },
  {
    slug: "cap-rate",
    category: "calculators",
    title: "Cap Rate Calculator",
    description: "NOI divided by property value.",
    apiPath: "/calculators/cap-rate",
    fields: [
      { name: "netOperatingIncomeAnnual", label: "Annual NOI ($)", type: "number", defaultValue: 24000 },
      { name: "propertyValue", label: "Property Value ($)", type: "number", defaultValue: 350000 },
    ],
    schema: z.object({ netOperatingIncomeAnnual: num, propertyValue: num }),
    resultKeys: ["capRatePercent", "noi"],
  },
  {
    slug: "mortgage-payoff",
    category: "calculators",
    title: "Mortgage Payoff Calculator",
    description: "Payoff timeline with extra payments.",
    apiPath: "/calculators/mortgage-payoff",
    fields: [
      { name: "balance", label: "Balance ($)", type: "number", defaultValue: 280000 },
      { name: "annualRate", label: "Annual Rate (%)", type: "number", defaultValue: 6.5 },
      { name: "extraMonthlyPayment", label: "Extra Monthly ($)", type: "number", defaultValue: 200 },
    ],
    schema: z.object({ balance: num, annualRate: num, extraMonthlyPayment: num }),
    resultKeys: ["monthsToPayoff", "yearsToPayoff", "totalInterestPaid"],
  },
  {
    slug: "dti",
    category: "calculators",
    title: "Debt-to-Income Ratio",
    description: "Front-end and back-end DTI.",
    apiPath: "/calculators/dti",
    fields: [
      { name: "grossMonthlyIncome", label: "Gross Monthly Income ($)", type: "number", defaultValue: 10000 },
      { name: "housingPayment", label: "Housing Payment ($)", type: "number", defaultValue: 2500 },
      { name: "monthlyDebts", label: "Other Monthly Debts ($)", type: "number", defaultValue: 600 },
    ],
    schema: z.object({ grossMonthlyIncome: num, housingPayment: num, monthlyDebts: num }),
    resultKeys: ["frontEndDtiPercent", "backEndDtiPercent"],
  },
  {
    slug: "price-per-sqft",
    category: "calculators",
    title: "Price Per Square Foot",
    description: "Listing price density.",
    apiPath: "/calculators/price-per-sqft",
    fields: [
      { name: "price", label: "Price ($)", type: "number", defaultValue: 425000 },
      { name: "squareFeet", label: "Square Feet", type: "number", defaultValue: 2100 },
    ],
    schema: z.object({ price: num, squareFeet: num }),
    resultKeys: ["pricePerSqFt"],
  },
  {
    slug: "appreciation",
    category: "calculators",
    title: "Property Appreciation",
    description: "Total and annualized appreciation.",
    apiPath: "/calculators/appreciation",
    fields: [
      { name: "purchasePrice", label: "Purchase Price ($)", type: "number", defaultValue: 300000 },
      { name: "currentValue", label: "Current Value ($)", type: "number", defaultValue: 420000 },
      { name: "yearsHeld", label: "Years Held", type: "number", defaultValue: 7 },
    ],
    schema: z.object({ purchasePrice: num, currentValue: num, yearsHeld: num }),
    resultKeys: ["totalGain", "totalGainPercent", "annualizedAppreciationPercent"],
  },
  {
    slug: "investment-analyzer",
    category: "calculators",
    title: "Investment Analyzer",
    description: "Cash-on-cash and projected equity.",
    apiPath: "/calculators/investment-analyzer",
    fields: [
      { name: "purchasePrice", label: "Purchase Price ($)", type: "number", defaultValue: 350000 },
      { name: "downPayment", label: "Down Payment ($)", type: "number", defaultValue: 70000 },
      { name: "closingCosts", label: "Closing Costs ($)", type: "number", defaultValue: 10000 },
      { name: "monthlyRent", label: "Monthly Rent ($)", type: "number", defaultValue: 2400 },
      { name: "monthlyExpenses", label: "Monthly Expenses ($)", type: "number", defaultValue: 1900 },
      { name: "annualAppreciationPercent", label: "Appreciation (%/yr)", type: "number", defaultValue: 3 },
      { name: "holdingYears", label: "Holding Years", type: "number", defaultValue: 5 },
    ],
    schema: z.object({
      purchasePrice: num,
      downPayment: num,
      closingCosts: num,
      monthlyRent: num,
      monthlyExpenses: num,
      annualAppreciationPercent: num,
      holdingYears: num,
    }),
    resultKeys: ["cashOnCashReturnPercent", "monthlyCashFlow", "projectedValue", "totalReturn"],
  },
];

export const CONVERTER_SLUG_MAP: Record<string, { from: string; to: string }> = {
  "sqft-sqm": { from: "sqft", to: "sqm" },
  "acres-hectares": { from: "acres", to: "hectares" },
  "feet-meters": { from: "feet", to: "meters" },
  "inches-cm": { from: "inches", to: "cm" },
  weight: { from: "kg", to: "lbs" },
  temperature: { from: "celsius", to: "fahrenheit" },
  volume: { from: "liters", to: "gallons" },
  distance: { from: "miles", to: "km" },
  height: { from: "feet", to: "meters" },
  "area-general": { from: "sqft", to: "acres" },
};

export function getToolBySlug(
  category: string,
  slug: string,
): ToolDefinition | undefined {
  if (category === "calculators") {
    return CALCULATOR_TOOLS.find((t) => t.slug === slug);
  }
  return undefined;
}

export function getAllCalculatorSlugs() {
  return CALCULATOR_TOOLS.map((t) => t.slug);
}
