import { Card } from '../components/common'

const Categories = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Budget</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <p className="text-gray-500 dark:text-gray-400">Category list will go here</p>
        </Card>
      </div>
    </div>
  )
}

export default Categories
