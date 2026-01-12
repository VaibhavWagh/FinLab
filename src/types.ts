/**
 * FinLab - Financial Data Type Definitions
 * Comprehensive TypeScript types and interfaces for financial data modeling
 */

/**
 * Account Interface
 * Represents a user's financial account (checking, savings, investment, etc.)
 */
export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'credit' | 'loan' | 'other';
  balance: number;
  currency: string;
  institution: string;
  accountNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

/**
 * Transaction Interface
 * Represents a single financial transaction
 */
export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer' | 'investment' | 'withdrawal' | 'deposit';
  category: string;
  description: string;
  date: Date;
  merchant?: string;
  tags: string[];
  notes?: string;
  isRecurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Loan Interface
 * Represents a loan account with repayment details
 */
export interface Loan {
  id: string;
  name: string;
  lender: string;
  principalAmount: number;
  currentBalance: number;
  interestRate: number;
  loanTerm: number; // in months
  remainingTerm: number; // in months
  monthlyPayment: number;
  startDate: Date;
  endDate: Date;
  type: 'personal' | 'auto' | 'mortgage' | 'student' | 'business' | 'other';
  status: 'active' | 'paid-off' | 'deferred' | 'default';
  currency: string;
  nextPaymentDate: Date;
  lastPaymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Goal Interface
 * Represents a financial goal (savings target, investment goal, etc.)
 */
export interface Goal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  category: 'savings' | 'investment' | 'debt-payoff' | 'education' | 'purchase' | 'retirement' | 'emergency' | 'other';
  targetDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed' | 'abandoned';
  progress: number; // percentage 0-100
  createdAt: Date;
  updatedAt: Date;
}

/**
 * FinancialData Interface
 * Main aggregated financial data structure
 */
export interface FinancialData {
  userId: string;
  accounts: Account[];
  transactions: Transaction[];
  loans: Loan[];
  goals: Goal[];
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  currency: string;
  lastUpdated: Date;
}

/**
 * KPIMetrics Interface
 * Key Performance Indicators for financial analysis
 */
export interface KPIMetrics {
  userId: string;
  period: string; // e.g., "2024-Q1", "2026-01"
  netWorth: number;
  netWorthChange: number;
  netWorthChangePercent: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number; // percentage
  debtToIncomeRatio: number;
  debtToAssetRatio: number;
  emergencyFundRatio: number; // months of expenses covered
  investmentRatio: number; // percentage of net worth in investments
  assetAllocation: {
    cash: number;
    investments: number;
    realEstate: number;
    other: number;
  };
  topExpenseCategories: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  topIncomeCategories: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  recurringMonthlyExpenses: number;
  recurringMonthlyIncome: number;
  calculatedAt: Date;
}

/**
 * AnalyticsData Interface
 * Comprehensive analytics and insights derived from financial data
 */
export interface AnalyticsData {
  userId: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  summary: {
    totalTransactions: number;
    averageTransactionAmount: number;
    largestTransaction: number;
    smallestTransaction: number;
  };
  trends: {
    incomeGrowth: number; // percentage month-over-month
    expenseGrowth: number; // percentage month-over-month
    savingsGrowth: number; // percentage month-over-month
  };
  patterns: {
    topSpendingCategories: string[];
    topIncomeCategories: string[];
    averageDaysToSpend: number; // average days to spend monthly income
    seasonalTrends: {
      month: string;
      averageExpense: number;
      averageIncome: number;
    }[];
  };
  predictions: {
    projectedMonthlyExpenses: number;
    projectedMonthlyIncome: number;
    projectedNetWorthInSixMonths: number;
    projectedNetWorthInOneYear: number;
    confidenceLevel: 'low' | 'medium' | 'high';
  };
  goalsProgress: {
    goalId: string;
    goalName: string;
    currentProgress: number;
    projectedCompletionDate: Date;
    isOnTrack: boolean;
  }[];
  riskAssessment: {
    liquidityRisk: 'low' | 'medium' | 'high';
    debtRisk: 'low' | 'medium' | 'high';
    concentrationRisk: 'low' | 'medium' | 'high';
    overallRisk: 'low' | 'medium' | 'high';
  };
  recommendations: {
    priority: number;
    title: string;
    description: string;
    type: 'savings' | 'investment' | 'debt-management' | 'budgeting' | 'general';
    estimatedImpact: string;
  }[];
  calculatedAt: Date;
}

/**
 * StoreState Interface
 * Redux/State Management store state structure
 */
export interface StoreState {
  // User Authentication
  auth: {
    isAuthenticated: boolean;
    userId?: string;
    username?: string;
    email?: string;
    token?: string;
    loading: boolean;
    error?: string;
  };

  // Financial Data
  financial: {
    data: FinancialData | null;
    accounts: Account[];
    transactions: Transaction[];
    loans: Loan[];
    goals: Goal[];
    loading: boolean;
    error?: string;
    lastSyncTime?: Date;
  };

  // Analytics
  analytics: {
    kpiMetrics: KPIMetrics | null;
    analyticsData: AnalyticsData | null;
    selectedPeriod: string;
    loading: boolean;
    error?: string;
    cachedData: {
      [key: string]: {
        data: KPIMetrics | AnalyticsData;
        timestamp: Date;
      };
    };
  };

  // UI State
  ui: {
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    currency: string;
    language: string;
    notifications: {
      id: string;
      message: string;
      type: 'success' | 'error' | 'warning' | 'info';
      timestamp: Date;
    }[];
    currentPage: string;
    filters: {
      [key: string]: any;
    };
  };

  // Filters and Preferences
  preferences: {
    dateRange: {
      startDate: Date;
      endDate: Date;
    };
    transactionFilters: {
      accountIds: string[];
      types: string[];
      categories: string[];
      dateRange?: {
        startDate: Date;
        endDate: Date;
      };
    };
    accountFilters: {
      types: string[];
      isActive: boolean;
    };
    displayOptions: {
      showArchived: boolean;
      itemsPerPage: number;
      sortBy: string;
      sortOrder: 'asc' | 'desc';
    };
  };

  // Cache
  cache: {
    [key: string]: {
      data: any;
      timestamp: Date;
      ttl: number; // time to live in milliseconds
    };
  };

  // Loading and Error States
  common: {
    isLoading: boolean;
    error?: string;
    successMessage?: string;
  };
}

/**
 * Request/Response Envelopes for API Communication
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: Date;
    version: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Filter and Query Types
 */
export interface TransactionFilterParams {
  accountIds?: string[];
  types?: Transaction['type'][];
  categories?: string[];
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Utility Types
 */
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | string;
export type TransactionType = Transaction['type'];
export type AccountType = Account['type'];
export type LoanType = Loan['type'];
export type GoalCategory = Goal['category'];
export type GoalPriority = Goal['priority'];
