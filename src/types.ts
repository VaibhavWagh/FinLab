/**
 * FinLab TypeScript Type Definitions
 * Comprehensive interfaces for financial data management
 * Last updated: 2026-01-12 15:57:06 UTC
 */

/**
 * Account interface - Represents a user's financial account
 */
export interface Account {
  id: string;
  userId: string;
  accountType: 'checking' | 'savings' | 'investment' | 'credit' | 'loan';
  accountName: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Transaction interface - Represents a financial transaction
 */
export interface Transaction {
  id: string;
  accountId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  category: string;
  date: Date;
  tags?: string[];
  isReconciled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Loan interface - Represents a loan account
 */
export interface Loan {
  id: string;
  userId: string;
  loanType: 'personal' | 'home' | 'auto' | 'student' | 'other';
  principalAmount: number;
  currentBalance: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Goal interface - Represents a financial goal
 */
export interface Goal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  category: 'savings' | 'investment' | 'debt_payoff' | 'education' | 'other';
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * FinancialData interface - Aggregated financial information
 */
export interface FinancialData {
  userId: string;
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  accounts: Account[];
  transactions: Transaction[];
  loans: Loan[];
  goals: Goal[];
  currency: string;
  lastUpdated: Date;
}

/**
 * KPIMetrics interface - Key Performance Indicators for financial health
 */
export interface KPIMetrics {
  userId: string;
  debtToIncomeRatio: number;
  savingsRate: number;
  investmentReturn: number;
  liquidityRatio: number;
  expenseToIncomeRatio: number;
  emergencyFundMonths: number;
  netWorthTrend: number; // Percentage change over period
  creditScore?: number;
  calculatedAt: Date;
}

/**
 * AnalyticsData interface - Analytics and insights data
 */
export interface AnalyticsData {
  userId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  totalIncome: number;
  totalExpenses: number;
  expensesByCategory: Record<string, number>;
  incomeBySource: Record<string, number>;
  savingsAmount: number;
  investmentGains: number;
  goalsProgress: Array<{
    goalId: string;
    goalName: string;
    progress: number; // Percentage
  }>;
  topTransactions: Transaction[];
  insights: string[];
  generatedAt: Date;
}

/**
 * StoreState interface - Root state for the application store
 */
export interface StoreState {
  user: {
    id: string;
    email: string;
    name: string;
    profilePicture?: string;
    preferences: UserPreferences;
  };
  financialData: FinancialData;
  kpiMetrics: KPIMetrics;
  analytics: AnalyticsData;
  ui: {
    isLoading: boolean;
    error?: string;
    notifications: Notification[];
  };
  lastSync: Date;
}

/**
 * UserPreferences interface - User application preferences
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  currency: string;
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacyLevel: 'public' | 'private' | 'friends';
}

/**
 * Notification interface - Application notifications
 */
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}
