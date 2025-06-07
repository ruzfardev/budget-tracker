import { db, dbOperations } from '../services/db'

export async function addTestData() {
  try {
    // Get categories
    const categories = await db.categories.toArray()
    
    if (categories.length === 0) {
      console.error('No categories found. Please initialize categories first.')
      return
    }

    // Find specific categories
    const salaryCategory = categories.find(c => c.name === 'Salary' && c.type === 'income')
    const foodCategory = categories.find(c => c.name === 'Food & Dining' && c.type === 'expense')
    const transportCategory = categories.find(c => c.name === 'Transportation' && c.type === 'expense')
    
    if (!salaryCategory || !foodCategory || !transportCategory) {
      console.error('Required categories not found')
      return
    }

    // Add test transactions
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    
    const testTransactions = [
      {
        type: 'income' as const,
        amount: 8500000,
        categoryId: salaryCategory.id!,
        description: '',
        date: new Date(currentYear, currentMonth, 1), // First day of current month
      },
      {
        type: 'expense' as const,
        amount: -125000,
        categoryId: foodCategory.id!,
        description: '',
        date: new Date(),
      },
      {
        type: 'expense' as const,
        amount: -85000,
        categoryId: foodCategory.id!,
        description: '',
        date: new Date(Date.now() - 86400000), // Yesterday
      },
      {
        type: 'expense' as const,
        amount: -45000,
        categoryId: transportCategory.id!,
        description: '',
        date: new Date(Date.now() - 172800000), // 2 days ago
      },
    ]

    for (const transaction of testTransactions) {
      await dbOperations.addTransaction(transaction)
    }

    console.log('Test data added successfully!')
  } catch (error) {
    console.error('Error adding test data:', error)
  }
}

// Add this to window for easy testing
if (typeof window !== 'undefined') {
  (window as any).addTestData = addTestData;
  (window as any).checkDB = async () => {
    const transactions = await db.transactions.toArray()
    const categories = await db.categories.toArray()
    console.log('Transactions:', transactions)
    console.log('Categories:', categories)
    return { transactions, categories }
  };
  (window as any).clearTransactions = async () => {
    await db.transactions.clear()
    console.log('All transactions cleared!')
  }
}
