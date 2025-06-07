import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Category } from '../types'
import { dbOperations } from './db'

// Query keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (type?: 'income' | 'expense') => [...categoryKeys.lists(), type] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: number) => [...categoryKeys.details(), id] as const,
  stats: (month: Date) => [...categoryKeys.all, 'stats', month] as const,
}

// Hooks
export function useCategories(type?: 'income' | 'expense') {
  return useQuery({
    queryKey: categoryKeys.list(type),
    queryFn: () => dbOperations.getCategories(type),
  })
}

export function useAddCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (category: Omit<Category, 'id'>) => 
      dbOperations.addCategory(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Category> }) => 
      dbOperations.updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => dbOperations.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
    onError: (error) => {
      console.error('Failed to delete category:', error)
    },
  })
}

// Category stats with budget tracking
export function useCategoryStats(month: Date) {
  return useQuery({
    queryKey: categoryKeys.stats(month),
    queryFn: () => dbOperations.getCategoryStats(month),
  })
}
