import { useState, useEffect } from 'react'
import { Card } from '../components/common'
import { FinancialCard } from '../components/dashboard'
import { TransactionItem } from '../components/transactions'
import {
  useTransactions,
  useCategories,
  useMonthlyStats,
  useCategoryStats,
} from '../hooks'
import { formatCurrency, getGreeting } from '../utils'
import { useNavigate } from 'react-router-dom'
import { Transaction, Category } from '../types'

const Dashboard = () => {
  const navigate = useNavigate()
  const [currentMonth] = useState(new Date())
  const [userName, setUserName] = useState<string>('')

  // Fetch data using hooks
  const {
    data: monthlyStats,
    isLoading: statsLoading,
    error: statsError,
  } = useMonthlyStats(currentMonth)
  const {
    data: allTransactions = [],
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTransactions()
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories()
  const { isLoading: categoryStatsLoading } = useCategoryStats(currentMonth)

  // Filter transactions for current month display
  const transactions = allTransactions.filter((t: Transaction) => {
    const tDate = new Date(t.date)
    return (
      tDate.getMonth() === currentMonth.getMonth() &&
      tDate.getFullYear() === currentMonth.getFullYear()
    )
  })

  // Load user name from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('userName') || 'there'
    setUserName(savedName)
  }, [])

  // Calculate values
  const monthlyIncome = monthlyStats?.income || 0
  const monthlyExpense = monthlyStats?.expenses || 0
  const monthlyBalance = monthlyStats?.balance || 0

  // Get recent transactions
  const recentTransactions = transactions
    .sort(
      (a: Transaction, b: Transaction) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5)

  // Loading state
  if (
    statsLoading ||
    transactionsLoading ||
    categoriesLoading ||
    categoryStatsLoading
  ) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (statsError || transactionsError) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <Card className="p-6 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">
            Error loading dashboard data. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            Refresh
          </button>
        </Card>
      </div>
    )
  }

  const greeting = getGreeting()
  const dailyAverage = monthlyExpense > 0 ? monthlyExpense / 30 : 0

  // Format Y-axis values
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {greeting}, {userName}! 👋
        </h1>
      </div>

      {/* Financial Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <FinancialCard
          type="income"
          amount={monthlyIncome}
          title="Monthly Income"
          subtitle="This month"
        />
        <FinancialCard
          type="expense"
          amount={monthlyExpense}
          title="Monthly Spending"
          subtitle="Burning through cash"
        />
      </div>

      {/* Recent Transactions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Recent Transactions
          </h3>
          <button
            onClick={() => navigate('/transactions')}
            className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline flex items-center gap-1"
          >
            View all
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <Card className="p-3">
          <div className="space-y-1">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  No transactions yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Start tracking your finances by adding your first transaction
                </p>
                <button
                  onClick={() => navigate('/transactions')}
                  className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add Transaction
                </button>
              </div>
            ) : (
              recentTransactions.map((transaction: Transaction) => {
                const category = categories.find(
                  (c: Category) => c.id === transaction.categoryId
                )
                return (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    category={category}
                  />
                )
              })
            )}
          </div>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Daily Average
          </p>
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full mb-2">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(dailyAverage)}
            </p>
          </Card>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Total Saved
          </p>
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full mb-2">
              <svg
                className="w-5 h-5 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(Math.max(0, monthlyBalance))}
            </p>
          </Card>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Categories
          </p>
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full mb-2">
              <svg
                className="w-5 h-5 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {categories.length}
            </p>
          </Card>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Transactions
          </p>
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full mb-2">
              <svg
                className="w-5 h-5 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {transactions.length}
            </p>
          </Card>
        </div>
      </div>

      {/* Budget Progress Section */}
      {/* <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Budget Progress
        </h3>
        <Card className="p-6">
          <div className="space-y-4">
            {categoryStats
              .filter((cat) => cat.type === 'expense' && cat.budget > 0)
              .sort((a, b) => b.percentage - a.percentage)
              .slice(0, 5)
              .map((cat) => {
                const percentage = Math.min(100, cat.percentage)
                const isOverBudget = cat.spent > cat.budget

                return (
                  <div key={cat.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {cat.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-600'} dark:text-gray-400`}
                        >
                          {formatCurrency(cat.spent)} /{' '}
                          {formatCurrency(cat.budget)}
                        </p>
                        <p
                          className={`text-xs ${isOverBudget ? 'text-red-500' : 'text-gray-500'}`}
                        >
                          {isOverBudget
                            ? 'Over budget'
                            : `${formatCurrency(cat.remaining)} left`}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isOverBudget
                            ? 'bg-red-500'
                            : percentage > 80
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            {categoryStats.filter(
              (cat) => cat.type === 'expense' && cat.budget > 0
            ).length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No budget set for any categories yet
              </p>
            )}
          </div>
        </Card>
      </div> */}
    </div>
  )
}

export default Dashboard
