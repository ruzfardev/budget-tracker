import { Card } from '../common'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency } from '../../utils'

interface SummaryCardProps {
  title: string
  amount: number
  type: 'income' | 'expense'
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

const SummaryCard = ({ title, amount, type, trend, className = '' }: SummaryCardProps) => {
  const isIncome = type === 'income'
  
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${
            isIncome 
              ? 'bg-green-100 dark:bg-green-900/30' 
              : 'bg-red-100 dark:bg-red-900/30'
          }`}>
            {isIncome ? (
              <ArrowDownRight className="w-6 h-6 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowUpRight className="w-6 h-6 text-red-600 dark:text-red-400" />
            )}
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(Math.abs(amount))}
            </h3>
          </div>
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2">
          {trend.isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
          )}
          <span className={`text-sm ${
            trend.isPositive 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}% from last month
          </span>
        </div>
      )}
    </Card>
  )
}

export default SummaryCard
