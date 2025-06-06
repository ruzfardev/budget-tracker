export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  categoryId: string
  description: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  budget: number
  icon: string
  color: string
  type: 'income' | 'expense'
}
