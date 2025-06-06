// Currency
export const CURRENCY = 'UZS'
export const CURRENCY_SYMBOL = "so'm"

// Transaction Types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const

// Default Categories
export const DEFAULT_CATEGORIES = [
  // Income Categories
  { id: '1', name: 'Salary', type: 'income', icon: '💰', color: '#10B981' },
  { id: '2', name: 'Freelance', type: 'income', icon: '💻', color: '#3B82F6' },
  { id: '3', name: 'Business', type: 'income', icon: '🏢', color: '#8B5CF6' },
  { id: '4', name: 'Investments', type: 'income', icon: '📈', color: '#F59E0B' },
  { id: '5', name: 'Other Income', type: 'income', icon: '💵', color: '#6B7280' },
  
  // Expense Categories
  { id: '6', name: 'Food & Dining', type: 'expense', icon: '🍕', color: '#EF4444' },
  { id: '7', name: 'Transport', type: 'expense', icon: '🚗', color: '#F59E0B' },
  { id: '8', name: 'Shopping', type: 'expense', icon: '🛍️', color: '#EC4899' },
  { id: '9', name: 'Entertainment', type: 'expense', icon: '🎮', color: '#8B5CF6' },
  { id: '10', name: 'Bills & Utilities', type: 'expense', icon: '📱', color: '#3B82F6' },
  { id: '11', name: 'Healthcare', type: 'expense', icon: '🏥', color: '#10B981' },
  { id: '12', name: 'Education', type: 'expense', icon: '📚', color: '#6366F1' },
  { id: '13', name: 'Home', type: 'expense', icon: '🏠', color: '#F97316' },
  { id: '14', name: 'Other Expense', type: 'expense', icon: '📌', color: '#6B7280' },
]
