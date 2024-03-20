import { ComponentProps } from 'react'
import { tw } from '../../utils/tw'

interface FeedbackTypeButtonProps extends ComponentProps<'button'> {
  label: string
  isActive?: boolean
}

export function FeedbackTypeButton({
  label,
  isActive = false,
  ...props
}: FeedbackTypeButtonProps) {
  return (
    <button
      type="button"
      className={tw(
        'px-3 py-1 rounded border border-gray-200 text-gray-900 text-sm',
        { 'bg-cyan-100': isActive },
      )}
      {...props}
    >
      {label}
    </button>
  )
}
