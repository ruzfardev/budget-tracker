import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Transaction } from '../types'
import { dbOperations } from './db'

// Query keys
export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters?: { month?: Date; categoryId?: string; type?: 'income' | 'expense' }) => 
    [...transactionKeys.lists(), filters] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
}

// Hooks
export function useTransactions(filters?: { month?: Date; categoryId?: string; type?: 'income' | 'expense' }) {
  return useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => dbOperations.getTransactions(filters),
  })
}

export function useAddTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => 
      dbOperations.addTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
    },
  })
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Transaction> }) => 
      dbOperations.updateTransaction(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
    },
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => dbOperations.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
    },
  })
}

// Monthly stats hook
export function useMonthlyStats(month: Date) {
  return useQuery({
    queryKey: ['monthlyStats', month],
    queryFn: () => dbOperations.getMonthlyStats(month),
  })
}
