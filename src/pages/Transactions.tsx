import Card from '../components/common/Card'

const Transactions = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">History</h1>
      <Card>
        <p className="text-gray-500 dark:text-gray-400">Transaction list will go here</p>
      </Card>
    </div>
  )
}

export default Transactions
