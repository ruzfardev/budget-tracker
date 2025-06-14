import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { formatCurrency } from '../../utils'

interface FinancialCardProps {
  type: 'income' | 'expense' | 'balance'
  amount: number
  title: string
  subtitle?: string
}

const FinancialCard = ({
  type,
  amount,
  title,
  subtitle,
}: FinancialCardProps) => {
  const [isHidden, setIsHidden] = useState(false)

  const getCardStyles = () => {
    switch (type) {
      case 'income':
        return {
          gradient: 'bg-gradient-to-br from-emerald-500 to-green-600',
        }
      case 'expense':
        return {
          gradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
        }
      case 'balance':
        return {
          gradient:
            amount >= 0
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
              : 'bg-gradient-to-br from-orange-500 to-red-600',
        }
      default:
        return {
          gradient: 'bg-gradient-to-br from-gray-500 to-gray-600',
        }
    }
  }

  const { gradient } = getCardStyles()

  return (
    <div className="relative">
      <div
        className={`${gradient} rounded-2xl p-4 text-white shadow-lg relative overflow-hidden`}
      >
        {/* Hide/Show Toggle */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium uppercase tracking-wider opacity-90">
            {title}
          </span>
          <button
            onClick={() => setIsHidden(!isHidden)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isHidden ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <div className="text-3xl font-bold tracking-tight">
            {isHidden ? '••••••••' : formatCurrency(Math.abs(amount))}
          </div>
          {subtitle && (
            <div className="text-sm opacity-75 mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FinancialCard
