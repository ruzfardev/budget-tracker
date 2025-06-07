import { useState, useEffect } from 'react'
import { Calendar, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { NumericKeyboard } from './NumericKeyboard'
import { Category, Transaction } from '../../types'

interface TransactionFormProps {
  categories: Category[]
  initialData?: Partial<Transaction>
  onSubmit: (data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel?: () => void
}

export function TransactionForm({ 
  categories, 
  initialData, 
  onSubmit,
  onCancel 
}: TransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense'>(initialData?.type || 'expense')
  const [amount, setAmount] = useState(initialData?.amount?.toString() || '0')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialData?.categoryId || null)
  const [date, setDate] = useState(initialData?.date || new Date())
  const [showKeyboard, setShowKeyboard] = useState(false)

  // Filter categories by type
  const filteredCategories = categories.filter(cat => cat.type === type)

  // Set default category when categories load or type changes
  useEffect(() => {
    if (filteredCategories.length > 0 && !filteredCategories.find(c => c.id === selectedCategory)) {
      setSelectedCategory(filteredCategories[0].id || null)
    }
  }, [filteredCategories, selectedCategory])

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount)
    if (numericAmount <= 0 || !selectedCategory) return

    onSubmit({
      type,
      amount: type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount),
      categoryId: selectedCategory,
      description: '', // Empty description
      date,
    })
  }

  const isValid = parseFloat(amount) > 0 && selectedCategory

  return (
    <div className="space-y-4">
      {/* Type Selector */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex">
        <button
          onClick={() => {
            setType('expense')
            setSelectedCategory(null)
          }}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            type === 'expense'
              ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Expense
        </button>
        <button
          onClick={() => {
            setType('income')
            setSelectedCategory(null)
          }}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            type === 'income'
              ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Income
        </button>
      </div>

      {/* Amount Display */}
      <div 
        onClick={() => setShowKeyboard(true)}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 cursor-pointer"
      >
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Amount</div>
        <div className={`text-3xl font-bold ${
          type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}>
          {type === 'income' ? '+' : '-'} {parseFloat(amount).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      {/* Category */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Tag className="w-4 h-4" />
          <span>Category</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id || null)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-100 dark:bg-primary-900/20 border-2 border-primary-500'
                  : 'bg-gray-50 dark:bg-gray-700 border-2 border-transparent'
              }`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="text-xs font-medium truncate">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="w-4 h-4" />
          <span>Date</span>
        </div>
        <input
          type="date"
          value={format(date, 'yyyy-MM-dd')}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`flex-1 py-3 px-4 rounded-lg font-medium ${
            isValid
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
          }`}
        >
          {initialData ? 'Update' : 'Save'}
        </button>
      </div>

      {/* Numeric Keyboard */}
      {showKeyboard && (
        <div className="fixed inset-x-0 bottom-0 z-50">
          <NumericKeyboard
            value={amount}
            onChange={setAmount}
            onSave={() => {
              setShowKeyboard(false)
              handleSubmit()
            }}
            isValid={isValid}
          />
        </div>
      )}
    </div>
  )
}
