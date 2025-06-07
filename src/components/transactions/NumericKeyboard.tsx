import { Delete } from 'lucide-react'

interface NumericKeyboardProps {
  value: string
  onChange: (value: string) => void
  onSave?: () => void
  isValid?: boolean
}

export function NumericKeyboard({ value, onChange, onSave, isValid = true }: NumericKeyboardProps) {
  const handleDigit = (digit: string) => {
    if (value === '0' && digit !== '.') {
      onChange(digit)
    } else {
      onChange(value + digit)
    }
  }

  const handleDecimal = () => {
    if (!value.includes('.')) {
      onChange(value + '.')
    }
  }

  const handleDelete = () => {
    if (value.length > 1) {
      onChange(value.slice(0, -1))
    } else {
      onChange('0')
    }
  }

  const buttons = [
    { label: '7', action: () => handleDigit('7') },
    { label: '8', action: () => handleDigit('8') },
    { label: '9', action: () => handleDigit('9') },
    { label: '4', action: () => handleDigit('4') },
    { label: '5', action: () => handleDigit('5') },
    { label: '6', action: () => handleDigit('6') },
    { label: '1', action: () => handleDigit('1') },
    { label: '2', action: () => handleDigit('2') },
    { label: '3', action: () => handleDigit('3') },
    { label: '.', action: handleDecimal },
    { label: '0', action: () => handleDigit('0') },
    { label: '⌫', action: handleDelete, icon: Delete },
  ]

  return (
    <div className="bg-white dark:bg-gray-800">
      {/* Keyboard */}
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.action}
              className={`
                h-14 rounded-xl font-semibold text-lg
                ${button.label === '⌫' 
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }
                active:scale-95 transition-all duration-150
              `}
            >
              {button.icon ? (
                <button.icon className="w-5 h-5 mx-auto" />
              ) : (
                button.label
              )}
            </button>
          ))}
        </div>
        
        {/* Save button */}
        {onSave && (
          <button
            onClick={onSave}
            disabled={!isValid}
            className={`w-full mt-2 h-12 rounded-xl font-medium transition-all duration-150 ${
              isValid
                ? 'bg-primary-600 text-white hover:bg-primary-700 active:scale-95'
                : 'bg-gray-200 text-gray-400 dark:bg-gray-700 cursor-not-allowed'
            }`}
          >
            Save Transaction
          </button>
        )}
      </div>
    </div>
  )
}
