/**
 * Financial Engine - Comprehensive Financial Calculation Module
 * Handles net worth calculations, KPI metrics, and analytics
 */

/**
 * Financial Account Types
 */
export enum AccountType {
  CHECKING = 'checking',
  SAVINGS = 'savings',
  INVESTMENT = 'investment',
  RETIREMENT = 'retirement',
  PROPERTY = 'property',
  VEHICLE = 'vehicle',
  CRYPTOCURRENCY = 'cryptocurrency',
  COMMODITY = 'commodity',
}

/**
 * Liability Types
 */
export enum LiabilityType {
  MORTGAGE = 'mortgage',
  CAR_LOAN = 'car_loan',
  STUDENT_LOAN = 'student_loan',
  CREDIT_CARD = 'credit_card',
  PERSONAL_LOAN = 'personal_loan',
  OTHER = 'other',
}

/**
 * Asset Interface
 */
export interface Asset {
  id: string;
  name: string;
  type: AccountType;
  value: number;
  currency: string;
  lastUpdated: Date;
  description?: string;
  metadata?: Record<string, any>;
}

/**
 * Liability Interface
 */
export interface Liability {
  id: string;
  name: string;
  type: LiabilityType;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  currency: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  metadata?: Record<string, any>;
}

/**
 * Income Stream Interface
 */
export interface IncomeStream {
  id: string;
  name: string;
  monthlyAmount: number;
  currency: string;
  type: 'salary' | 'freelance' | 'investment' | 'passive' | 'other';
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
  metadata?: Record<string, any>;
}

/**
 * Expense Category Interface
 */
export interface ExpenseCategory {
  id: string;
  name: string;
  monthlyAmount: number;
  currency: string;
  category:
    | 'housing'
    | 'utilities'
    | 'transportation'
    | 'food'
    | 'healthcare'
    | 'entertainment'
    | 'insurance'
    | 'debt_payment'
    | 'savings'
    | 'other';
  isRecurring: boolean;
  startDate: Date;
  endDate?: Date;
  metadata?: Record<string, any>;
}

/**
 * Net Worth Snapshot
 */
export interface NetWorthSnapshot {
  date: Date;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  currency: string;
  assetBreakdown: Record<AccountType, number>;
  liabilityBreakdown: Record<LiabilityType, number>;
}

/**
 * KPI Metrics Interface
 */
export interface KPIMetrics {
  debtToIncomeRatio: number;
  debtToWorthRatio: number;
  savingsRate: number;
  liquidityRatio: number;
  investmentRatio: number;
  netWorthGrowthRate: number;
  emergencyFundMonths: number;
  assetAllocation: Record<AccountType, number>;
}

/**
 * Financial Analytics Interface
 */
export interface FinancialAnalytics {
  timestamp: Date;
  netWorthHistory: NetWorthSnapshot[];
  monthlyIncomeTotal: number;
  monthlyExpensesTotal: number;
  monthlyNetIncome: number;
  annualProjectedSavings: number;
  metrics: KPIMetrics;
  trends: FinancialTrends;
  riskAssessment: RiskAssessment;
}

/**
 * Financial Trends Interface
 */
export interface FinancialTrends {
  netWorthTrend: 'increasing' | 'stable' | 'decreasing';
  netWorthChangePercent: number;
  debtTrend: 'decreasing' | 'stable' | 'increasing';
  savingsTrendPercent: number;
  incomeGrowthPercent: number;
  expenseGrowthPercent: number;
}

/**
 * Risk Assessment Interface
 */
export interface RiskAssessment {
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  riskFactors: string[];
  recommendations: string[];
  debtBurden: number;
  liquidityConcern: boolean;
  emergencyFundSufficiency: boolean;
}

/**
 * Financial Engine Class
 */
export class FinancialEngine {
  private assets: Map<string, Asset> = new Map();
  private liabilities: Map<string, Liability> = new Map();
  private incomeStreams: Map<string, IncomeStream> = new Map();
  private expenses: Map<string, ExpenseCategory> = new Map();
  private netWorthHistory: NetWorthSnapshot[] = [];
  private currency: string = 'USD';

  constructor(currency: string = 'USD') {
    this.currency = currency;
  }

  /**
   * Add an asset to the financial profile
   */
  public addAsset(asset: Asset): void {
    if (!asset.id || !asset.name || asset.value < 0) {
      throw new Error('Invalid asset: id, name, and non-negative value are required');
    }
    this.assets.set(asset.id, asset);
  }

  /**
   * Remove an asset from the financial profile
   */
  public removeAsset(assetId: string): boolean {
    return this.assets.delete(assetId);
  }

  /**
   * Get all assets
   */
  public getAssets(): Asset[] {
    return Array.from(this.assets.values());
  }

  /**
   * Add a liability to the financial profile
   */
  public addLiability(liability: Liability): void {
    if (!liability.id || !liability.name || liability.balance < 0 || liability.interestRate < 0) {
      throw new Error('Invalid liability: id, name, non-negative balance and interest rate are required');
    }
    this.liabilities.set(liability.id, liability);
  }

  /**
   * Remove a liability from the financial profile
   */
  public removeLiability(liabilityId: string): boolean {
    return this.liabilities.delete(liabilityId);
  }

  /**
   * Get all liabilities
   */
  public getLiabilities(): Liability[] {
    return Array.from(this.liabilities.values());
  }

  /**
   * Add an income stream
   */
  public addIncomeStream(income: IncomeStream): void {
    if (!income.id || !income.name || income.monthlyAmount < 0) {
      throw new Error('Invalid income stream: id, name, and non-negative monthly amount are required');
    }
    this.incomeStreams.set(income.id, income);
  }

  /**
   * Remove an income stream
   */
  public removeIncomeStream(incomeId: string): boolean {
    return this.incomeStreams.delete(incomeId);
  }

  /**
   * Get all income streams
   */
  public getIncomeStreams(): IncomeStream[] {
    return Array.from(this.incomeStreams.values());
  }

  /**
   * Add an expense category
   */
  public addExpense(expense: ExpenseCategory): void {
    if (!expense.id || !expense.name || expense.monthlyAmount < 0) {
      throw new Error('Invalid expense: id, name, and non-negative monthly amount are required');
    }
    this.expenses.set(expense.id, expense);
  }

  /**
   * Remove an expense category
   */
  public removeExpense(expenseId: string): boolean {
    return this.expenses.delete(expenseId);
  }

  /**
   * Get all expenses
   */
  public getExpenses(): ExpenseCategory[] {
    return Array.from(this.expenses.values());
  }

  /**
   * Calculate total assets
   */
  public calculateTotalAssets(): number {
    return Array.from(this.assets.values()).reduce((sum, asset) => sum + asset.value, 0);
  }

  /**
   * Calculate total liabilities
   */
  public calculateTotalLiabilities(): number {
    return Array.from(this.liabilities.values()).reduce((sum, liability) => sum + liability.balance, 0);
  }

  /**
   * Calculate net worth
   */
  public calculateNetWorth(): number {
    return this.calculateTotalAssets() - this.calculateTotalLiabilities();
  }

  /**
   * Get asset breakdown by type
   */
  public getAssetBreakdown(): Record<AccountType, number> {
    const breakdown: Record<AccountType, number> = {} as Record<AccountType, number>;

    Object.values(AccountType).forEach((type) => {
      breakdown[type] = 0;
    });

    Array.from(this.assets.values()).forEach((asset) => {
      breakdown[asset.type] += asset.value;
    });

    return breakdown;
  }

  /**
   * Get liability breakdown by type
   */
  public getLiabilityBreakdown(): Record<LiabilityType, number> {
    const breakdown: Record<LiabilityType, number> = {} as Record<LiabilityType, number>;

    Object.values(LiabilityType).forEach((type) => {
      breakdown[type] = 0;
    });

    Array.from(this.liabilities.values()).forEach((liability) => {
      breakdown[liability.type] += liability.balance;
    });

    return breakdown;
  }

  /**
   * Calculate total monthly income
   */
  public calculateTotalMonthlyIncome(): number {
    return Array.from(this.incomeStreams.values())
      .filter((income) => income.isActive)
      .reduce((sum, income) => sum + income.monthlyAmount, 0);
  }

  /**
   * Calculate total monthly expenses
   */
  public calculateTotalMonthlyExpenses(): number {
    return Array.from(this.expenses.values()).reduce((sum, expense) => sum + expense.monthlyAmount, 0);
  }

  /**
   * Calculate monthly net income (income - expenses)
   */
  public calculateMonthlyNetIncome(): number {
    return this.calculateTotalMonthlyIncome() - this.calculateTotalMonthlyExpenses();
  }

  /**
   * Calculate projected annual savings
   */
  public calculateProjectedAnnualSavings(): number {
    return this.calculateMonthlyNetIncome() * 12;
  }

  /**
   * Get liquid assets (cash + savings)
   */
  public getLiquidAssets(): number {
    return Array.from(this.assets.values())
      .filter((asset) => asset.type === AccountType.CHECKING || asset.type === AccountType.SAVINGS)
      .reduce((sum, asset) => sum + asset.value, 0);
  }

  /**
   * Calculate debt to income ratio
   */
  public calculateDebtToIncomeRatio(): number {
    const monthlyIncome = this.calculateTotalMonthlyIncome();
    if (monthlyIncome === 0) return 0;

    const monthlyDebtPayments = Array.from(this.liabilities.values()).reduce(
      (sum, liability) => sum + liability.monthlyPayment,
      0,
    );

    return (monthlyDebtPayments / monthlyIncome) * 100;
  }

  /**
   * Calculate debt to worth ratio
   */
  public calculateDebtToWorthRatio(): number {
    const netWorth = this.calculateNetWorth();
    const totalLiabilities = this.calculateTotalLiabilities();

    if (netWorth <= 0) return netWorth === 0 ? 0 : Infinity;

    return (totalLiabilities / netWorth) * 100;
  }

  /**
   * Calculate savings rate
   */
  public calculateSavingsRate(): number {
    const monthlyIncome = this.calculateTotalMonthlyIncome();
    if (monthlyIncome === 0) return 0;

    const monthlyNetIncome = this.calculateMonthlyNetIncome();
    return (monthlyNetIncome / monthlyIncome) * 100;
  }

  /**
   * Calculate liquidity ratio
   */
  public calculateLiquidityRatio(): number {
    const liquidAssets = this.getLiquidAssets();
    const monthlyExpenses = this.calculateTotalMonthlyExpenses();

    if (monthlyExpenses === 0) return 0;

    return liquidAssets / monthlyExpenses;
  }

  /**
   * Calculate investment ratio
   */
  public calculateInvestmentRatio(): number {
    const totalAssets = this.calculateTotalAssets();
    if (totalAssets === 0) return 0;

    const investmentAssets = Array.from(this.assets.values())
      .filter(
        (asset) =>
          asset.type === AccountType.INVESTMENT ||
          asset.type === AccountType.RETIREMENT ||
          asset.type === AccountType.CRYPTOCURRENCY,
      )
      .reduce((sum, asset) => sum + asset.value, 0);

    return (investmentAssets / totalAssets) * 100;
  }

  /**
   * Calculate net worth growth rate
   */
  public calculateNetWorthGrowthRate(): number {
    if (this.netWorthHistory.length < 2) return 0;

    const currentSnapshot = this.netWorthHistory[this.netWorthHistory.length - 1];
    const previousSnapshot = this.netWorthHistory[this.netWorthHistory.length - 2];

    if (previousSnapshot.netWorth === 0) return 0;

    const growth = ((currentSnapshot.netWorth - previousSnapshot.netWorth) / previousSnapshot.netWorth) * 100;

    return growth;
  }

  /**
   * Calculate emergency fund coverage in months
   */
  public calculateEmergencyFundMonths(): number {
    const liquidAssets = this.getLiquidAssets();
    const monthlyExpenses = this.calculateTotalMonthlyExpenses();

    if (monthlyExpenses === 0) return 0;

    return liquidAssets / monthlyExpenses;
  }

  /**
   * Get asset allocation percentages
   */
  public getAssetAllocation(): Record<AccountType, number> {
    const totalAssets = this.calculateTotalAssets();
    const breakdown = this.getAssetBreakdown();
    const allocation: Record<AccountType, number> = {} as Record<AccountType, number>;

    Object.keys(breakdown).forEach((type) => {
      const key = type as AccountType;
      allocation[key] = totalAssets > 0 ? (breakdown[key] / totalAssets) * 100 : 0;
    });

    return allocation;
  }

  /**
   * Calculate KPI metrics
   */
  public calculateKPIMetrics(): KPIMetrics {
    return {
      debtToIncomeRatio: this.calculateDebtToIncomeRatio(),
      debtToWorthRatio: this.calculateDebtToWorthRatio(),
      savingsRate: this.calculateSavingsRate(),
      liquidityRatio: this.calculateLiquidityRatio(),
      investmentRatio: this.calculateInvestmentRatio(),
      netWorthGrowthRate: this.calculateNetWorthGrowthRate(),
      emergencyFundMonths: this.calculateEmergencyFundMonths(),
      assetAllocation: this.getAssetAllocation(),
    };
  }

  /**
   * Calculate financial trends
   */
  public calculateFinancialTrends(): FinancialTrends {
    if (this.netWorthHistory.length < 2) {
      return {
        netWorthTrend: 'stable',
        netWorthChangePercent: 0,
        debtTrend: 'stable',
        savingsTrendPercent: 0,
        incomeGrowthPercent: 0,
        expenseGrowthPercent: 0,
      };
    }

    const current = this.netWorthHistory[this.netWorthHistory.length - 1];
    const previous = this.netWorthHistory[Math.max(0, this.netWorthHistory.length - 2)];

    const netWorthChange = current.netWorth - previous.netWorth;
    const netWorthChangePercent =
      previous.netWorth === 0 ? 0 : (netWorthChange / previous.netWorth) * 100;

    const netWorthTrend: 'increasing' | 'stable' | 'decreasing' =
      netWorthChange > 0 ? 'increasing' : netWorthChange < 0 ? 'decreasing' : 'stable';

    const debtChange = current.totalLiabilities - previous.totalLiabilities;
    const debtTrend: 'decreasing' | 'stable' | 'increasing' =
      debtChange < 0 ? 'decreasing' : debtChange > 0 ? 'increasing' : 'stable';

    return {
      netWorthTrend,
      netWorthChangePercent,
      debtTrend,
      savingsTrendPercent: this.calculateSavingsRate(),
      incomeGrowthPercent: 0, // Placeholder for extended trend analysis
      expenseGrowthPercent: 0, // Placeholder for extended trend analysis
    };
  }

  /**
   * Perform risk assessment
   */
  public performRiskAssessment(): RiskAssessment {
    const riskFactors: string[] = [];
    const recommendations: string[] = [];

    const debtToIncome = this.calculateDebtToIncomeRatio();
    const liquidityRatio = this.calculateLiquidityRatio();
    const emergencyFunds = this.calculateEmergencyFundMonths();
    const savingsRate = this.calculateSavingsRate();
    const netWorth = this.calculateNetWorth();

    // Assess debt burden
    if (debtToIncome > 43) {
      riskFactors.push('High debt-to-income ratio (>43%)');
      recommendations.push('Consider debt reduction strategies or increasing income');
    }
    if (debtToIncome > 35) {
      riskFactors.push('Elevated debt-to-income ratio (>35%)');
      recommendations.push('Monitor debt levels closely');
    }

    // Assess liquidity
    if (liquidityRatio < 1) {
      riskFactors.push('Low liquidity (less than 1 month of expenses)');
      recommendations.push('Build emergency fund to cover at least 3-6 months of expenses');
    } else if (liquidityRatio < 3) {
      riskFactors.push('Insufficient emergency fund (less than 3 months)');
      recommendations.push('Aim to save 3-6 months of expenses');
    }

    // Assess emergency fund
    if (emergencyFunds < 3) {
      riskFactors.push('Emergency fund insufficient');
      recommendations.push('Prioritize building emergency savings');
    }

    // Assess savings rate
    if (savingsRate < 10) {
      riskFactors.push('Low savings rate');
      recommendations.push('Increase savings rate to at least 10-15% of income');
    }

    // Assess net worth
    if (netWorth < 0) {
      riskFactors.push('Negative net worth');
      recommendations.push('Focus on asset building and debt reduction');
    }

    // Determine risk level
    let riskLevel: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    if (riskFactors.length === 0) {
      riskLevel = 'low';
    } else if (riskFactors.length <= 2) {
      riskLevel = 'moderate';
    } else if (riskFactors.length <= 4) {
      riskLevel = 'high';
    } else {
      riskLevel = 'critical';
    }

    return {
      riskLevel,
      riskFactors,
      recommendations,
      debtBurden: debtToIncome,
      liquidityConcern: liquidityRatio < 3,
      emergencyFundSufficiency: emergencyFunds >= 3,
    };
  }

  /**
   * Create a net worth snapshot
   */
  public createNetWorthSnapshot(date: Date = new Date()): NetWorthSnapshot {
    const snapshot: NetWorthSnapshot = {
      date,
      totalAssets: this.calculateTotalAssets(),
      totalLiabilities: this.calculateTotalLiabilities(),
      netWorth: this.calculateNetWorth(),
      currency: this.currency,
      assetBreakdown: this.getAssetBreakdown(),
      liabilityBreakdown: this.getLiabilityBreakdown(),
    };

    this.netWorthHistory.push(snapshot);
    return snapshot;
  }

  /**
   * Get net worth history
   */
  public getNetWorthHistory(): NetWorthSnapshot[] {
    return [...this.netWorthHistory];
  }

  /**
   * Clear net worth history
   */
  public clearNetWorthHistory(): void {
    this.netWorthHistory = [];
  }

  /**
   * Generate comprehensive financial analytics
   */
  public generateAnalytics(): FinancialAnalytics {
    // Create current snapshot if history is empty
    if (this.netWorthHistory.length === 0) {
      this.createNetWorthSnapshot();
    }

    return {
      timestamp: new Date(),
      netWorthHistory: this.getNetWorthHistory(),
      monthlyIncomeTotal: this.calculateTotalMonthlyIncome(),
      monthlyExpensesTotal: this.calculateTotalMonthlyExpenses(),
      monthlyNetIncome: this.calculateMonthlyNetIncome(),
      annualProjectedSavings: this.calculateProjectedAnnualSavings(),
      metrics: this.calculateKPIMetrics(),
      trends: this.calculateFinancialTrends(),
      riskAssessment: this.performRiskAssessment(),
    };
  }

  /**
   * Export all data
   */
  public exportData(): {
    assets: Asset[];
    liabilities: Liability[];
    incomeStreams: IncomeStream[];
    expenses: ExpenseCategory[];
    netWorthHistory: NetWorthSnapshot[];
    analytics: FinancialAnalytics;
  } {
    return {
      assets: this.getAssets(),
      liabilities: this.getLiabilities(),
      incomeStreams: this.getIncomeStreams(),
      expenses: this.getExpenses(),
      netWorthHistory: this.getNetWorthHistory(),
      analytics: this.generateAnalytics(),
    };
  }

  /**
   * Import data
   */
  public importData(data: {
    assets?: Asset[];
    liabilities?: Liability[];
    incomeStreams?: IncomeStream[];
    expenses?: ExpenseCategory[];
  }): void {
    if (data.assets) {
      data.assets.forEach((asset) => this.addAsset(asset));
    }
    if (data.liabilities) {
      data.liabilities.forEach((liability) => this.addLiability(liability));
    }
    if (data.incomeStreams) {
      data.incomeStreams.forEach((income) => this.addIncomeStream(income));
    }
    if (data.expenses) {
      data.expenses.forEach((expense) => this.addExpense(expense));
    }
  }

  /**
   * Reset all data
   */
  public reset(): void {
    this.assets.clear();
    this.liabilities.clear();
    this.incomeStreams.clear();
    this.expenses.clear();
    this.netWorthHistory = [];
  }
}

/**
 * Export factory function for creating a new financial engine instance
 */
export function createFinancialEngine(currency: string = 'USD'): FinancialEngine {
  return new FinancialEngine(currency);
}

export default FinancialEngine;
