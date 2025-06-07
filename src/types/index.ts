export interface Transaction {
  id?: number  // Make it optional and number for Dexie auto-increment
  type: 'income' | 'expense'
  amount: number
  categoryId: number  // Changed to number to match Category id
  description: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id?: number  // Make it optional and number for Dexie auto-increment
  name: string
  budget: number
  icon: string
  color: string
  type: 'income' | 'expense'
}
