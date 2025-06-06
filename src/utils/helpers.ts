// Get greeting based on time of day
export const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

// Calculate percentage change
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

// Get transaction icon based on category
export const getTransactionIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Food': '🍕',
    'Transport': '🚗',
    'Shopping': '🛍️',
    'Entertainment': '🎮',
    'Bills': '📱',
    'Healthcare': '🏥',
    'Education': '📚',
    'Home': '🏠',
    'Income': '💰',
    'Salary': '💰',
    'Freelance': '💻',
    'Business': '🏢',
    'Investments': '📈',
  }
  return icons[category] || '📌'
}

// Calculate savings rate
export const calculateSavingsRate = (income: number, expense: number): number => {
  if (income === 0) return 0
  return ((income - expense) / income) * 100
}
