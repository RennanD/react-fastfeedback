import { useState } from 'react'
import { FeedbackTypeButton } from './FeedbackTypeButton'

interface FeedbackTypeInputProps {
  onChange: (value: string) => void
  value?: string
}

export function FeedbackTypeInput({
  onChange,
  value = '',
}: FeedbackTypeInputProps) {
  const [feedbackTypeSelected, setFeedbackTypeSelected] = useState(value)

  function handleSelectFeedbackType(value: string) {
    setFeedbackTypeSelected(value)
    onChange(value)
  }

  return (
    <ul className="flex flex-wrap gap-2 items-center">
      <li>
        <FeedbackTypeButton
          label="Problemas"
          onClick={() => handleSelectFeedbackType('bug')}
          isActive={feedbackTypeSelected === 'bug'}
        />
      </li>
      <li>
        <FeedbackTypeButton
          label="Ideias"
          onClick={() => handleSelectFeedbackType('idea')}
          isActive={feedbackTypeSelected === 'idea'}
        />
      </li>
      <li>
        <FeedbackTypeButton
          label="Outro"
          onClick={() => handleSelectFeedbackType('other')}
          isActive={feedbackTypeSelected === 'other'}
        />
      </li>
    </ul>
  )
}
