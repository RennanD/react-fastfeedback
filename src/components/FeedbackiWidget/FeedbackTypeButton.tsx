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
        'px-3 py-1 rounded border border-border text-foreground text-sm',
        { 'border-primary ': isActive },
      )}
      {...props}
    >
      {label}
    </button>
  )
}
