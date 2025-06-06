import { Card } from '../components/common'
import { SummaryCard } from '../components/dashboard'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency, getGreeting, calculateSavingsRate } from '../utils'

const Dashboard = () => {
  const monthlyIncome = 8500000 // 8,500,000 UZS
  const monthlyExpense = 2650000 // 2,650,000 UZS

  // Mock recent transactions
  const recentTransactions = [
    {
      id: 1,
      title: 'Grocery Shopping',
      category: 'Food',
      amount: -125000,
      date: 'Today',
      type: 'expense' as const,
    },
    {
      id: 2,
      title: 'Salary',
      category: 'Income',
      amount: 8500000,
      date: 'Yesterday',
      type: 'income' as const,
    },
    {
      id: 3,
      title: 'Restaurant',
      category: 'Food',
      amount: -85000,
      date: '2 days ago',
      type: 'expense' as const,
    },
    {
      id: 4,
      title: 'Electricity Bill',
      category: 'Bills',
      amount: -145000,
      date: '3 days ago',
      type: 'expense' as const,
    },
    {
      id: 5,
      title: 'Freelance Project',
      category: 'Income',
      amount: 1200000,
      date: '5 days ago',
      type: 'income' as const,
    },
  ]

  const greeting = getGreeting()
  const savingsRate = calculateSavingsRate(monthlyIncome, monthlyExpense)

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {greeting}, John! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your financial overview for today
        </p>
      </div>

      {/* Income/Expense Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SummaryCard
          title="Monthly Income"
          amount={monthlyIncome}
          type="income"
          trend={{ value: 12, isPositive: true }}
        />
        <SummaryCard
          title="Monthly Expenses"
          amount={monthlyExpense}
          type="expense"
          trend={{ value: 8, isPositive: false }}
        />
      </div>

      {/* Recent Transactions */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Recent Transactions
          </h3>
          <button className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    transaction.type === 'income'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {transaction.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.category}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {transaction.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Card className="p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            Daily Average
          </p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(88333)}
          </p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            Biggest Expense
          </p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(450000)}
          </p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            Savings Rate
          </p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {savingsRate.toFixed(1)}%
          </p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
            Transactions
          </p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">24</p>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
