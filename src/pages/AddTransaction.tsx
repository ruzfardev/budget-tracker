import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { NumericKeyboard } from '../components/transactions/NumericKeyboard'
import { useCategories, useAddTransaction } from '../hooks'
import { Category } from '../types'
import { Card } from '../components/common'

export default function AddTransaction() {
  const navigate = useNavigate()
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [amount, setAmount] = useState('0')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [date, setDate] = useState(new Date())

  const { data: categories = [] } = useCategories()
  const addTransaction = useAddTransaction()

  // Filter categories by type
  const filteredCategories = categories.filter((cat) => cat.type === type)

  // Set default category when categories load or type changes
  useEffect(() => {
    if (
      filteredCategories.length > 0 &&
      !filteredCategories.find((c) => c.id === selectedCategory)
    ) {
      setSelectedCategory(filteredCategories[0].id || null)
    }
  }, [filteredCategories, selectedCategory])

  const handleSave = async () => {
    const numericAmount = parseFloat(amount)
    if (numericAmount <= 0 || !selectedCategory) return

    await addTransaction.mutateAsync({
      type,
      amount:
        type === 'expense' ? -Math.abs(numericAmount) : Math.abs(numericAmount),
      categoryId: selectedCategory,
      description: '', // Empty description
      date,
    })

    navigate(-1)
  }

  const isValid = parseFloat(amount) > 0 && selectedCategory

  return (
    <div
      style={{ height: 'calc(100vh - 105px)' }}
      className="flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Scrollable Content */}
      <div className="flex-1">
        <div className="p-4 space-y-3">
          {/* Type Selector */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex">
            <button
              onClick={() => {
                setType('expense')
                setSelectedCategory(null)
              }}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all text-sm ${
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
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all text-sm ${
                type === 'income'
                  ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount Display */}
          <Card className="p-3">
            {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-3"> */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Amount
            </div>
            <div
              className={`text-2xl font-bold ${
                type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {type === 'income' ? '+' : '-'}{' '}
              {parseFloat(amount).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </div>
          </Card>
          {/* </div> */}

          {/* Category Grid - Compact */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Category</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {filteredCategories.map((category: Category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id || null)}
                  className={`p-2 rounded-lg text-center transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 dark:bg-primary-900/20 border border-primary-500'
                      : 'bg-gray-50 dark:bg-gray-700 border border-transparent'
                  }`}
                >
                  <div className="text-xl mb-0.5">{category.icon}</div>
                  <div className="text-[10px] font-medium leading-tight">
                    {category.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Date</span>
            </div>
            <input
              type="date"
              value={format(date, 'yyyy-MM-dd')}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full px-2 py-1.5 text-sm bg-gray-50 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Fixed Numeric Keyboard at Bottom */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <NumericKeyboard
          value={amount}
          onChange={setAmount}
          onSave={handleSave}
          //@ts-ignore
          isValid={isValid}
        />
      </div>
    </div>
  )
}
