import { Card } from '../components/common'

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Balance and stats cards will go here */}
        <Card className="p-6">
          <p className="text-gray-500 dark:text-gray-400">Balance card placeholder</p>
        </Card>
        <Card className="p-6">
          <p className="text-gray-500 dark:text-gray-400">Stats card placeholder</p>
        </Card>
        <Card className="p-6">
          <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
