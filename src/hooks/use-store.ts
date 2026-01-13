'use client';

import { useState, useCallback, useEffect } from 'react';

// Type definitions for financial data
interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  id: string;
  accountId: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
}

interface Loan {
  id: string;
  name: string;
  principal: number;
  interestRate: number;
  termMonths: number;
  monthlyPayment: number;
  startDate: string;
  endDate: string;
  amountPaid: number;
  remainingBalance: number;
  status: 'active' | 'completed' | 'defaulted';
  createdAt: string;
  updatedAt: string;
}

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'abandoned';
  createdAt: string;
  updatedAt: string;
}

interface FinancialStore {
  accounts: Account[];
  transactions: Transaction[];
  loans: Loan[];
  goals: Goal[];
}

const STORAGE_KEY = 'finlab_financial_store';

const defaultStore: FinancialStore = {
  accounts: [],
  transactions: [],
  loans: [],
  goals: [],
};

export function useStore() {
  const [store, setStore] = useState<FinancialStore>(defaultStore);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize store from localStorage
  useEffect(() => {
    const loadStore = () => {
      try {
        const savedStore = localStorage.getItem(STORAGE_KEY);
        if (savedStore) {
          setStore(JSON.parse(savedStore));
        } else {
          setStore(defaultStore);
        }
      } catch (error) {
        console.error('Failed to load store from localStorage:', error);
        setStore(defaultStore);
      }
      setIsLoaded(true);
    };

    loadStore();
  }, []);

  // Persist store to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      } catch (error) {
        console.error('Failed to save store to localStorage:', error);
      }
    }
  }, [store, isLoaded]);

  // ============ ACCOUNT OPERATIONS ============

  const createAccount = useCallback(
    (accountData: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newAccount: Account = {
        ...accountData,
        id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setStore((prevStore) => ({
        ...prevStore,
        accounts: [...prevStore.accounts, newAccount],
      }));

      return newAccount;
    },
    []
  );

  const updateAccount = useCallback(
    (accountId: string, updates: Partial<Omit<Account, 'id' | 'createdAt'>>) => {
      setStore((prevStore) => ({
        ...prevStore,
        accounts: prevStore.accounts.map((acc) =>
          acc.id === accountId
            ? {
                ...acc,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : acc
        ),
      }));
    },
    []
  );

  const deleteAccount = useCallback((accountId: string) => {
    setStore((prevStore) => ({
      ...prevStore,
      accounts: prevStore.accounts.filter((acc) => acc.id !== accountId),
      transactions: prevStore.transactions.filter(
        (txn) => txn.accountId !== accountId
      ),
    }));
  }, []);

  const getAccount = useCallback(
    (accountId: string) => {
      return store.accounts.find((acc) => acc.id === accountId);
    },
    [store.accounts]
  );

  const getAllAccounts = useCallback(() => {
    return store.accounts;
  }, [store.accounts]);

  const getTotalBalance = useCallback(() => {
    return store.accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }, [store.accounts]);

  // ============ TRANSACTION OPERATIONS ============

  const addTransaction = useCallback(
    (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
      const newTransaction: Transaction = {
        ...transactionData,
        id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };

      setStore((prevStore) => {
        const updatedAccounts = prevStore.accounts.map((acc) => {
          if (acc.id === transactionData.accountId) {
            let balanceChange = 0;
            if (transactionData.type === 'income') {
              balanceChange = transactionData.amount;
            } else if (transactionData.type === 'expense') {
              balanceChange = -transactionData.amount;
            }

            return {
              ...acc,
              balance: acc.balance + balanceChange,
              updatedAt: new Date().toISOString(),
            };
          }
          return acc;
        });

        return {
          ...prevStore,
          accounts: updatedAccounts,
          transactions: [...prevStore.transactions, newTransaction],
        };
      });

      return newTransaction;
    },
    []
  );

  const updateTransaction = useCallback(
    (transactionId: string, updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => {
      setStore((prevStore) => {
        const oldTransaction = prevStore.transactions.find(
          (txn) => txn.id === transactionId
        );

        if (!oldTransaction) return prevStore;

        const updatedTransactions = prevStore.transactions.map((txn) =>
          txn.id === transactionId ? { ...txn, ...updates } : txn
        );

        let updatedAccounts = prevStore.accounts;
        if (updates.amount !== undefined || updates.type !== undefined) {
          const oldAmount =
            oldTransaction.type === 'income'
              ? oldTransaction.amount
              : -oldTransaction.amount;

          const newAmount =
            (updates.type || oldTransaction.type) === 'income'
              ? updates.amount || oldTransaction.amount
              : -(updates.amount || oldTransaction.amount);

          const balanceDifference = newAmount - oldAmount;

          updatedAccounts = prevStore.accounts.map((acc) =>
            acc.id === oldTransaction.accountId
              ? {
                  ...acc,
                  balance: acc.balance + balanceDifference,
                  updatedAt: new Date().toISOString(),
                }
              : acc
          );
        }

        return {
          ...prevStore,
          accounts: updatedAccounts,
          transactions: updatedTransactions,
        };
      });
    },
    []
  );

  const deleteTransaction = useCallback((transactionId: string) => {
    setStore((prevStore) => {
      const transaction = prevStore.transactions.find(
        (txn) => txn.id === transactionId
      );

      if (!transaction) return prevStore;

      const balanceChange =
        transaction.type === 'income'
          ? -transaction.amount
          : transaction.amount;

      const updatedAccounts = prevStore.accounts.map((acc) =>
        acc.id === transaction.accountId
          ? {
              ...acc,
              balance: acc.balance + balanceChange,
              updatedAt: new Date().toISOString(),
            }
          : acc
      );

      return {
        ...prevStore,
        accounts: updatedAccounts,
        transactions: prevStore.transactions.filter(
          (txn) => txn.id !== transactionId
        ),
      };
    });
  }, []);

  const getTransactionsByAccount = useCallback(
    (accountId: string) => {
      return store.transactions.filter((txn) => txn.accountId === accountId);
    },
    [store.transactions]
  );

  const getTransactionsByDateRange = useCallback(
    (startDate: string, endDate: string) => {
      return store.transactions.filter(
        (txn) => txn.date >= startDate && txn.date <= endDate
      );
    },
    [store.transactions]
  );

  const getTransactionsByCategory = useCallback(
    (category: string) => {
      return store.transactions.filter((txn) => txn.category === category);
    },
    [store.transactions]
  );

  // ============ LOAN OPERATIONS ============

  const createLoan = useCallback(
    (loanData: Omit<Loan, 'id' | 'createdAt' | 'updatedAt' | 'amountPaid' | 'remainingBalance'>) => {
      const newLoan: Loan = {
        ...loanData,
        id: `loan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amountPaid: 0,
        remainingBalance: loanData.principal,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setStore((prevStore) => ({
        ...prevStore,
        loans: [...prevStore.loans, newLoan],
      }));

      return newLoan;
    },
    []
  );

  const updateLoanPayment = useCallback(
    (loanId: string, paymentAmount: number) => {
      setStore((prevStore) => {
        const updatedLoans = prevStore.loans.map((loan) => {
          if (loan.id === loanId) {
            const newAmountPaid = loan.amountPaid + paymentAmount;
            const newRemainingBalance = Math.max(
              0,
              loan.principal - newAmountPaid
            );
            const newStatus =
              newRemainingBalance === 0 ? ('completed' as const) : loan.status;

            return {
              ...loan,
              amountPaid: newAmountPaid,
              remainingBalance: newRemainingBalance,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            };
          }
          return loan;
        });

        return {
          ...prevStore,
          loans: updatedLoans,
        };
      });
    },
    []
  );

  const updateLoan = useCallback(
    (loanId: string, updates: Partial<Omit<Loan, 'id' | 'createdAt'>>) => {
      setStore((prevStore) => ({
        ...prevStore,
        loans: prevStore.loans.map((loan) =>
          loan.id === loanId
            ? {
                ...loan,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : loan
        ),
      }));
    },
    []
  );

  const deleteLoan = useCallback((loanId: string) => {
    setStore((prevStore) => ({
      ...prevStore,
      loans: prevStore.loans.filter((loan) => loan.id !== loanId),
    }));
  }, []);

  const getLoan = useCallback(
    (loanId: string) => {
      return store.loans.find((loan) => loan.id === loanId);
    },
    [store.loans]
  );

  const getAllLoans = useCallback(() => {
    return store.loans;
  }, [store.loans]);

  const getActiveLoan = useCallback(() => {
    return store.loans.filter((loan) => loan.status === 'active');
  }, [store.loans]);

  const calculateTotalDebt = useCallback(() => {
    return store.loans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
  }, [store.loans]);

  // ============ GOAL OPERATIONS ============

  const createGoal = useCallback(
    (goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newGoal: Goal = {
        ...goalData,
        id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setStore((prevStore) => ({
        ...prevStore,
        goals: [...prevStore.goals, newGoal],
      }));

      return newGoal;
    },
    []
  );

  const updateGoalProgress = useCallback(
    (goalId: string, amount: number) => {
      setStore((prevStore) => {
        const updatedGoals = prevStore.goals.map((goal) => {
          if (goal.id === goalId) {
            const newCurrentAmount = Math.min(
              goal.targetAmount,
              goal.currentAmount + amount
            );
            const newStatus =
              newCurrentAmount >= goal.targetAmount
                ? ('completed' as const)
                : goal.status;

            return {
              ...goal,
              currentAmount: newCurrentAmount,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            };
          }
          return goal;
        });

        return {
          ...prevStore,
          goals: updatedGoals,
        };
      });
    },
    []
  );

  const updateGoal = useCallback(
    (goalId: string, updates: Partial<Omit<Goal, 'id' | 'createdAt'>>) => {
      setStore((prevStore) => ({
        ...prevStore,
        goals: prevStore.goals.map((goal) =>
          goal.id === goalId
            ? {
                ...goal,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : goal
        ),
      }));
    },
    []
  );

  const deleteGoal = useCallback((goalId: string) => {
    setStore((prevStore) => ({
      ...prevStore,
      goals: prevStore.goals.filter((goal) => goal.id !== goalId),
    }));
  }, []);

  const getGoal = useCallback(
    (goalId: string) => {
      return store.goals.find((goal) => goal.id === goalId);
    },
    [store.goals]
  );

  const getAllGoals = useCallback(() => {
    return store.goals;
  }, [store.goals]);

  const getActiveGoals = useCallback(() => {
    return store.goals.filter((goal) => goal.status === 'active');
  }, [store.goals]);

  const getGoalProgress = useCallback(
    (goalId: string) => {
      const goal = store.goals.find((g) => g.id === goalId);
      if (!goal) return null;

      return {
        goalId: goal.id,
        goalName: goal.name,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        percentage: (goal.currentAmount / goal.targetAmount) * 100,
        remainingAmount: goal.targetAmount - goal.currentAmount,
        daysRemaining: Math.ceil(
          (new Date(goal.deadline).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      };
    },
    [store.goals]
  );

  // ============ UTILITY OPERATIONS ============

  const clearAllData = useCallback(() => {
    setStore(defaultStore);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify(store, null, 2);
  }, [store]);

  const importData = useCallback((jsonData: string) => {
    try {
      const importedStore = JSON.parse(jsonData);
      setStore(importedStore);
      localStorage.setItem(STORAGE_KEY, jsonData);
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }, []);

  return {
    // Store state
    store,
    isLoaded,

    // Account operations
    createAccount,
    updateAccount,
    deleteAccount,
    getAccount,
    getAllAccounts,
    getTotalBalance,

    // Transaction operations
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByAccount,
    getTransactionsByDateRange,
    getTransactionsByCategory,

    // Loan operations
    createLoan,
    updateLoanPayment,
    updateLoan,
    deleteLoan,
    getLoan,
    getAllLoans,
    getActiveLoan,
    calculateTotalDebt,

    // Goal operations
    createGoal,
    updateGoalProgress,
    updateGoal,
    deleteGoal,
    getGoal,
    getAllGoals,
    getActiveGoals,
    getGoalProgress,

    // Utility operations
    clearAllData,
    exportData,
    importData,
  };
}

export type { Account, Transaction, Loan, Goal, FinancialStore };
