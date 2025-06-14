import { Transaction, Category } from '../../types'
import { TransactionItem } from './TransactionItem'
import { SwipeableTransactionItem } from './SwipeableTransactionItem'

interface TransactionListProps {
  transactions: Transaction[]
  categories: Category[]
  onTransactionClick?: (transaction: Transaction) => void
  onTransactionEdit?: (transaction: Transaction) => void
  onTransactionDelete?: (transaction: Transaction) => void
}

export function TransactionList({ 
  transactions, 
  categories,
  onTransactionClick,
  onTransactionEdit,
  onTransactionDelete
}: TransactionListProps) {
  // Check if device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Tap the + button to add your first transaction
        </p>
      </div>
    )
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(transaction)
    return groups
  }, {} as Record<string, Transaction[]>)

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  )

  return (
    <div className="space-y-4">
      {sortedDates.map((date) => {
        const dateObj = new Date(date)
        const isToday = dateObj.toDateString() === new Date().toDateString()
        const isYesterday = dateObj.toDateString() === 
          new Date(Date.now() - 86400000).toDateString()

        return (
          <div key={date}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-4">
              {isToday ? 'Today' : isYesterday ? 'Yesterday' : 
                dateObj.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: dateObj.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                })
              }
            </h3>
            <div className="space-y-1">
              {groupedTransactions[date].map((transaction, index) => {
                const category = categories.find(c => c.id === transaction.categoryId)
                const Component = isTouchDevice ? SwipeableTransactionItem : TransactionItem
                
                return (
                  <Component
                    key={transaction.id || `${date}-${index}`}
                    transaction={transaction}
                    category={category}
                    onClick={() => onTransactionClick?.(transaction)}
                    onEdit={() => onTransactionEdit?.(transaction)}
                    onDelete={() => onTransactionDelete?.(transaction)}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
