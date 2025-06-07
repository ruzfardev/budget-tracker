import { Card } from '../common'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency } from '../../utils'

interface SummaryCardProps {
  amount: number
  type: 'income' | 'expense'
  className?: string
}

const SummaryCard = ({
  amount,
  type,
  className = '',
}: SummaryCardProps) => {
  const isIncome = type === 'income'

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl ${
              isIncome
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-red-100 dark:bg-red-900/30'
            }`}
          >
            {isIncome ? (
              <ArrowDownRight className="w-6 h-6 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowUpRight className="w-6 h-6 text-red-600 dark:text-red-400" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(Math.abs(amount))}
          </h3>
        </div>
      </div>
    </Card>
  )
}

export default SummaryCard
