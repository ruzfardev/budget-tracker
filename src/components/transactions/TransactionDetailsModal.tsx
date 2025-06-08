import { Modal } from '../common'
import { Transaction, Category } from '../../types'
import { formatCurrency } from '../../utils'
import { format } from 'date-fns'
import { Calendar, Tag, FileText, Clock } from 'lucide-react'

interface TransactionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  category?: Category
}

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
  category
}: TransactionDetailsModalProps) {
  if (!transaction) return null

  const isIncome = transaction.type === 'income'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transaction Details">
      <div className="space-y-4">
        {/* Amount and Type */}
        <div className="text-center py-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {isIncome ? 'Income' : 'Expense'}
          </p>
          <p
            className={`text-3xl font-bold ${
              isIncome
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isIncome ? '+' : '-'}
            {formatCurrency(Math.abs(transaction.amount))}
          </p>
        </div>

        {/* Category */}
        {category && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Tag className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {category.icon} {category.name}
              </p>
            </div>
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {format(new Date(transaction.date), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>

        {/* Description */}
        {transaction.description && (
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">Description</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {transaction.description}
              </p>
            </div>
          </div>
        )}

        {/* Created/Updated */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Clock className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
            <p className="text-sm text-gray-900 dark:text-white">
              {format(new Date(transaction.createdAt), 'PPp')}
            </p>
            {transaction.updatedAt && 
              transaction.updatedAt !== transaction.createdAt && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Updated: {format(new Date(transaction.updatedAt), 'PPp')}
                </p>
              )
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}
