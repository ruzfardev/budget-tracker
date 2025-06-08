import { useState, useEffect } from 'react'
import { Modal, Button } from '../common'
import { Transaction, Category } from '../../types'
import { useUpdateTransaction, useDeleteTransaction } from '../../services/transactions.service'
import { formatCurrency } from '../../utils'
import { Trash2, Save, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface TransactionEditModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  categories: Category[]
}

export function TransactionEditModal({
  isOpen,
  onClose,
  transaction,
  categories
}: TransactionEditModalProps) {
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState<number>(0)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const updateTransaction = useUpdateTransaction()
  const deleteTransaction = useDeleteTransaction()

  useEffect(() => {
    if (transaction) {
      setAmount(Math.abs(transaction.amount).toString())
      setCategoryId(transaction.categoryId)
      setDescription(transaction.description || '')
      setDate(format(new Date(transaction.date), 'yyyy-MM-dd'))
      setType(transaction.type)
    }
  }, [transaction])

  const handleSave = () => {
    if (!transaction?.id || !amount || !categoryId) return

    updateTransaction.mutate({
      id: transaction.id,
      updates: {
        amount: parseFloat(amount),
        categoryId,
        description,
        date: new Date(date),
        type
      }
    }, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const handleDelete = () => {
    if (!transaction?.id) return

    deleteTransaction.mutate(transaction.id, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const filteredCategories = categories.filter(cat => cat.type === type)

  if (!transaction) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Transaction">
      <div className="space-y-4">
        {/* Transaction Type Toggle */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-1 flex">
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
              type === 'income'
                ? 'bg-white dark:bg-gray-600 text-green-600 dark:text-green-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
              type === 'expense'
                ? 'bg-white dark:bg-gray-600 text-red-600 dark:text-red-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Expense
          </button>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              so'm
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-14 pr-3 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full px-3 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Add a note..."
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          {!showDeleteConfirm ? (
            <>
              <Button
                variant="ghost"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
              <div className="flex-1" />
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!amount || !categoryId || updateTransaction.isPending}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete this transaction?
              </div>
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleteTransaction.isPending}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
