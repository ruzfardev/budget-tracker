import Dexie, { Table } from 'dexie'
import { Transaction, Category } from '../types'

export class BudgetTrackerDB extends Dexie {
  transactions!: Table<Transaction>
  categories!: Table<Category>

  constructor() {
    super('BudgetTrackerDB')
    
    this.version(1).stores({
      // Primary key and indexed fields
      transactions: '++id, type, categoryId, date, createdAt',
      categories: '++id, type, name'
    })
  }
}

// Create database instance
export const db = new BudgetTrackerDB()

// Initialize default categories
export async function initializeDefaultCategories() {
  const count = await db.categories.count()
  
  if (count === 0) {
    const defaultCategories: Omit<Category, 'id'>[] = [
      // Expense categories
      { name: 'Food & Dining', budget: 1500000, icon: '🍕', color: '#f97316', type: 'expense' },
      { name: 'Transportation', budget: 800000, icon: '🚗', color: '#3b82f6', type: 'expense' },
      { name: 'Shopping', budget: 1000000, icon: '🛍️', color: '#ec4899', type: 'expense' },
      { name: 'Entertainment', budget: 500000, icon: '🎮', color: '#8b5cf6', type: 'expense' },
      { name: 'Bills & Utilities', budget: 1200000, icon: '💡', color: '#06b6d4', type: 'expense' },
      { name: 'Healthcare', budget: 600000, icon: '🏥', color: '#10b981', type: 'expense' },
      { name: 'Education', budget: 800000, icon: '📚', color: '#6366f1', type: 'expense' },
      { name: 'Other', budget: 500000, icon: '📦', color: '#6b7280', type: 'expense' },
      
      // Income categories
      { name: 'Salary', budget: 0, icon: '💰', color: '#10b981', type: 'income' },
      { name: 'Freelance', budget: 0, icon: '💼', color: '#3b82f6', type: 'income' },
      { name: 'Investment', budget: 0, icon: '📈', color: '#f59e0b', type: 'income' },
      { name: 'Other Income', budget: 0, icon: '💵', color: '#8b5cf6', type: 'income' },
    ]
    
    await db.categories.bulkAdd(defaultCategories as Category[])
  }
}

// Clear all data (useful for development/testing)
export async function clearAllData() {
  await db.transaction('rw', db.transactions, db.categories, async () => {
    await db.transactions.clear()
    await db.categories.clear()
  })
}

// Export database operations
export const dbOperations = {
  // Transactions
  async addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date()
    return await db.transactions.add({
      ...transaction,
      createdAt: now,
      updatedAt: now
    } as Transaction)
  },

  async updateTransaction(id: string, updates: Partial<Transaction>) {
    return await db.transactions.update(id, {
      ...updates,
      updatedAt: new Date()
    })
  },

  async deleteTransaction(id: string) {
    return await db.transactions.delete(id)
  },

  async getTransactions(filters?: { month?: Date; categoryId?: string; type?: 'income' | 'expense' }) {
    let query = db.transactions.toArray()
    
    if (filters) {
      query = db.transactions.filter(transaction => {
        let match = true
        
        if (filters.month) {
          const transDate = new Date(transaction.date)
          const filterMonth = filters.month
          match = match && 
            transDate.getMonth() === filterMonth.getMonth() &&
            transDate.getFullYear() === filterMonth.getFullYear()
        }
        
        if (filters.categoryId) {
          match = match && transaction.categoryId === filters.categoryId
        }
        
        if (filters.type) {
          match = match && transaction.type === filters.type
        }
        
        return match
      }).toArray()
    }
    
    return query
  },

  // Categories
  async addCategory(category: Omit<Category, 'id'>) {
    return await db.categories.add(category as Category)
  },

  async updateCategory(id: string, updates: Partial<Category>) {
    return await db.categories.update(id, updates)
  },

  async deleteCategory(id: string) {
    // Check if category has transactions
    const transactionCount = await db.transactions.where('categoryId').equals(id).count()
    if (transactionCount > 0) {
      throw new Error('Cannot delete category with existing transactions')
    }
    return await db.categories.delete(id)
  },

  async getCategories(type?: 'income' | 'expense') {
    if (type) {
      return await db.categories.where('type').equals(type).toArray()
    }
    return await db.categories.toArray()
  },

  // Analytics
  async getMonthlyStats(month: Date) {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
    
    const transactions = await db.transactions
      .filter(t => {
        const date = new Date(t.date)
        return date >= startOfMonth && date <= endOfMonth
      })
      .toArray()
    
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    
    return { income, expenses, balance: income - expenses }
  },

  async getCategoryStats(month: Date) {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
    
    const transactions = await db.transactions
      .filter(t => {
        const date = new Date(t.date)
        return date >= startOfMonth && date <= endOfMonth
      })
      .toArray()
    
    const categories = await db.categories.toArray()
    
    return categories.map(category => {
      const categoryTransactions = transactions.filter(t => t.categoryId === category.id)
      const spent = categoryTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
      
      return {
        ...category,
        spent,
        remaining: category.type === 'expense' ? category.budget - spent : 0,
        percentage: category.type === 'expense' && category.budget > 0 
          ? (spent / category.budget) * 100 
          : 0
      }
    })
  }
}
