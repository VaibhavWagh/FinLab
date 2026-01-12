/**
 * Financial Management Application Type Definitions
 * Generated: 2026-01-12 15:57:39 UTC
 */

/**
 * Represents a user account
 */
export interface Account {
  id: string;
  userId: string;
  accountName: string;
  accountType: 'savings' | 'checking' | 'investment' | 'retirement' | 'other';
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

/**
 * Represents a financial transaction
 */
export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  transactionType: 'income' | 'expense' | 'transfer';
  category: string;
  description: string;
  date: Date;
  tags: string[];
  isRecurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a loan
 */
export interface Loan {
  id: string;
  userId: string;
  loanName: string;
  loanType: 'personal' | 'mortgage' | 'auto' | 'student' | 'business' | 'other';
  principalAmount: number;
  currentBalance: number;
  interestRate: number;
  interestType: 'simple' | 'compound';
  term: number;
  termUnit: 'months' | 'years';
  startDate: Date;
  endDate: Date;
  monthlyPayment: number;
  totalInterestPaid: number;
  status: 'active' | 'completed' | 'paused' | 'defaulted';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a financial goal
 */
export interface Goal {
  id: string;
  userId: string;
  goalName: string;
  goalCategory: 'saving' | 'investment' | 'debt_payoff' | 'education' | 'retirement' | 'other';
  targetAmount: number;
  currentAmount: number;
  currency: string;
  targetDate: Date;
  priority: 'low' | 'medium' | 'high';
  description: string;
  status: 'active' | 'achieved' | 'cancelled' | 'paused';
  progressPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents aggregate financial data
 */
export interface FinancialData {
  userId: string;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
  currency: string;
  accounts: Account[];
  transactions: Transaction[];
  loans: Loan[];
  goals: Goal[];
  periodStart: Date;
  periodEnd: Date;
  lastUpdated: Date;
}

/**
 * Represents Key Performance Indicators for financial metrics
 */
export interface KPIMetrics {
  userId: string;
  debtToIncomeRatio: number;
  savingsRatio: number;
  expenseRatio: number;
  investmentRatio: number;
  emergencyFundMonths: number;
  netWorthGrowthRate: number;
  averageTransactionAmount: number;
  largestExpenseCategory: string;
  largestExpenseAmount: number;
  goalsOnTrack: number;
  totalGoals: number;
  goalCompletionRate: number;
  periodStart: Date;
  periodEnd: Date;
  lastCalculated: Date;
}

/**
 * Represents analytics data for financial insights
 */
export interface AnalyticsData {
  userId: string;
  spendingTrends: {
    category: string;
    amount: number;
    percentageOfTotal: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    monthOverMonthChange: number;
  }[];
  incomeSourceBreakdown: {
    source: string;
    amount: number;
    percentageOfTotal: number;
  }[];
  cashFlowProjection: {
    month: string;
    projectedIncome: number;
    projectedExpenses: number;
    projectedBalance: number;
  }[];
  accountPerformance: {
    accountId: string;
    accountName: string;
    balance: number;
    balanceChange: number;
    balanceChangePercentage: number;
  }[];
  topTransactions: Transaction[];
  anomalies: {
    transactionId: string;
    type: 'unusual_amount' | 'unusual_category' | 'unusual_timing';
    severity: 'low' | 'medium' | 'high';
    description: string;
  }[];
  periodStart: Date;
  periodEnd: Date;
  lastAnalyzed: Date;
}

/**
 * Represents the current state of the application store
 */
export interface StoreStateCurrent {
  userId: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Account data
  accounts: Account[];
  selectedAccountId: string | null;
  
  // Transaction data
  transactions: Transaction[];
  transactionFilter: {
    accountId?: string;
    category?: string;
    startDate?: Date;
    endDate?: Date;
    transactionType?: Transaction['transactionType'];
  };
  
  // Loan data
  loans: Loan[];
  selectedLoanId: string | null;
  
  // Goal data
  goals: Goal[];
  selectedGoalId: string | null;
  
  // Analytics and metrics
  financialData: FinancialData | null;
  kpiMetrics: KPIMetrics | null;
  analyticsData: AnalyticsData | null;
  
  // UI state
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: Date;
  }[];
  
  // Pagination and display
  itemsPerPage: number;
  currentPage: number;
  
  // Last sync information
  lastSyncTime: Date | null;
  
  // Timestamp
  lastUpdated: Date;
}
