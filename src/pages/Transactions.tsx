import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, ConfirmDialog } from '../components/common'
import { TransactionList, TransactionDetailsModal } from '../components/transactions'
import { useTransactions, useCategories } from '../hooks'
import { Transaction } from '../types'
import { useDeleteTransaction } from '../services/transactions.service'
import { Trash2 } from 'lucide-react'

const Transactions = () => {
  const navigate = useNavigate()
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>(
    'all'
  )
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null)
  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null)
  
  const { data: transactions = [], isLoading } = useTransactions(
    filterType === 'all' ? undefined : { type: filterType }
  )
  const { data: categories = [] } = useCategories()
  const deleteTransaction = useDeleteTransaction()

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">History</h1>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div> */}

      {/* Filter Tabs */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex mb-6">
        <button
          onClick={() => setFilterType('all')}
          className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
            filterType === 'all'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('income')}
          className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
            filterType === 'income'
              ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setFilterType('expense')}
          className={`flex-1 py-2.5 rounded-lg font-medium transition-all ${
            filterType === 'expense'
              ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Expenses
        </button>
      </div>

      {/* Transactions List */}
      <Card className="p-4">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Loading transactions...
            </p>
          </div>
        ) : (
          <TransactionList
            transactions={transactions}
            categories={categories}
            onTransactionClick={(transaction) => {
              setViewingTransaction(transaction)
            }}
            onTransactionEdit={(transaction) => {
              navigate('/add-transaction', { state: { transaction } })
            }}
            onTransactionDelete={(transaction) => {
              setDeletingTransaction(transaction)
            }}
          />
        )}
      </Card>

      {/* View Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={!!viewingTransaction}
        onClose={() => setViewingTransaction(null)}
        transaction={viewingTransaction}
        category={categories.find(c => c.id === viewingTransaction?.categoryId)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingTransaction}
        onClose={() => setDeletingTransaction(null)}
        onConfirm={() => {
          if (deletingTransaction?.id) {
            deleteTransaction.mutate(deletingTransaction.id, {
              onSuccess: () => {
                setDeletingTransaction(null)
              }
            })
          }
        }}
        title="Delete Transaction"
        message={`Are you sure you want to delete this ${deletingTransaction?.type} transaction of ${deletingTransaction?.amount ? `${Math.abs(deletingTransaction.amount).toLocaleString('uz-UZ')} so'm` : ''}?`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        icon={<Trash2 className="w-8 h-8" />}
        isLoading={deleteTransaction.isPending}
      />
    </div>
  )
}

export default Transactions
