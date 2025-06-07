import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { format } from 'date-fns'
import { Transaction, Category } from '../../types'
import { formatCurrency } from '../../utils'

interface TransactionItemProps {
  transaction: Transaction
  category?: Category
  onClick?: () => void
}

export function TransactionItem({ transaction, category, onClick }: TransactionItemProps) {
  const isIncome = transaction.type === 'income'
  
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl cursor-pointer transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-lg ${
            isIncome
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-red-100 dark:bg-red-900/30'
          }`}
        >
          {category ? (
            <span className="text-2xl">{category.icon}</span>
          ) : isIncome ? (
            <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-white">
            {category?.name || 'Transaction'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {category?.icon} {category?.type === 'income' ? 'Income' : 'Expense'}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p
          className={`font-semibold ${
            isIncome
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          {isIncome ? '+' : ''}
          {formatCurrency(Math.abs(transaction.amount))}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {format(new Date(transaction.date), 'MMM d')}
        </p>
      </div>
    </div>
  )
}
