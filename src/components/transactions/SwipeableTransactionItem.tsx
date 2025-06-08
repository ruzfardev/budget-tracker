import { useState, useRef, TouchEvent, useEffect } from 'react'
import { Trash2, Edit2 } from 'lucide-react'
import { Transaction, Category } from '../../types'
import { TransactionItem } from './TransactionItem'

interface SwipeableTransactionItemProps {
  transaction: Transaction
  category?: Category
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function SwipeableTransactionItem({
  transaction,
  category,
  onClick,
  onEdit,
  onDelete,
}: SwipeableTransactionItemProps) {
  const [offset, setOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const startXRef = useRef(0)
  const itemRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      if (
        showActions &&
        itemRef.current &&
        !itemRef.current.contains(target) &&
        actionsRef.current &&
        !actionsRef.current.contains(target)
      ) {
        setOffset(0)
        setShowActions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    //  @ts-ignore
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      // @ts-ignore
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [showActions])

  const handleTouchStart = (e: TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    setIsSwiping(true)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping) return

    const currentX = e.touches[0].clientX
    const diff = startXRef.current - currentX

    // Only allow left swipe (positive diff)
    if (diff > 0) {
      setOffset(Math.min(diff, 140))
    } else {
      setOffset(0)
    }
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)

    // If swiped more than 70px, keep it open
    if (offset > 70) {
      setOffset(140)
      setShowActions(true)
    } else {
      setOffset(0)
      setShowActions(false)
    }
  }

  const handleActionClick = (action: 'edit' | 'delete') => {
    setOffset(0)
    setShowActions(false)
    if (action === 'edit') {
      onEdit?.()
    } else {
      onDelete?.()
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Action buttons that appear on swipe */}
      <div
        ref={actionsRef}
        className="absolute right-0 top-0 bottom-0 flex items-center gap-2 px-2"
        style={{
          opacity: offset > 20 ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
        }}
      >
        <button
          onClick={() => handleActionClick('edit')}
          className="h-12 w-12 bg-blue-500 dark:bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors active:scale-95"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleActionClick('delete')}
          className="h-12 w-12 bg-red-500 dark:bg-red-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-red-600 dark:hover:bg-red-700 transition-colors active:scale-95"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Swipeable transaction item */}
      <div
        ref={itemRef}
        className="relative bg-white dark:bg-gray-800 transition-transform"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: isSwiping
            ? 'none'
            : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <TransactionItem
          transaction={transaction}
          category={category}
          onClick={onClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}
