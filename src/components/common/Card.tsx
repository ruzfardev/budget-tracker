import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 ${className}`}>
      {children}
    </div>
  )
}

export default Card
