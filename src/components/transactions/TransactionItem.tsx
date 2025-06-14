import { ArrowUpRight, ArrowDownRight, MoreVertical, Edit2, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { useState, useRef, useEffect } from 'react'
import { Transaction, Category } from '../../types'
import { formatCurrency } from '../../utils'

interface TransactionItemProps {
  transaction: Transaction
  category?: Category
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function TransactionItem({ transaction, category, onClick, onEdit, onDelete }: TransactionItemProps) {
  const isIncome = transaction.type === 'income'
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div
      className="relative flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors"
    >
      <div 
        className="flex items-center gap-4 flex-1 cursor-pointer"
        onClick={onClick}
      >
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

      <div className="flex items-center gap-2">
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

        {/* More Options Menu - Only show on desktop */}
        {!isMobile && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 min-w-[120px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    onEdit?.()
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(false)
                    onDelete?.()
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
