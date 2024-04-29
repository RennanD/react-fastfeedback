import { useEffect, useState } from 'react'
import { FeedbackTypeButton } from './FeedbackTypeButton'
import { LOCALES } from '../../utils/locales'

interface FeedbackTypeInputProps {
  onChange: (value: string) => void
  value?: string
  language: 'en' | 'es' | 'pt-br' | 'fr' | 'de' | 'pt-pt'
}

export function FeedbackTypeInput({
  onChange,
  value = '',
  language,
}: FeedbackTypeInputProps) {
  const [feedbackTypeSelected, setFeedbackTypeSelected] = useState<
    string | undefined
  >(undefined)

  const { options } = LOCALES[language]

  const [bug, idea, other] = options

  function handleSelectFeedbackType(type: string) {
    setFeedbackTypeSelected(type)
    onChange(type)
  }

  useEffect(() => {
    setFeedbackTypeSelected(value)
  }, [value])

  return (
    <ul className="flex flex-wrap gap-2 items-center">
      <li>
        <FeedbackTypeButton
          label={bug}
          onClick={() => handleSelectFeedbackType('bug')}
          isActive={feedbackTypeSelected === 'bug'}
        />
      </li>
      <li>
        <FeedbackTypeButton
          label={idea}
          onClick={() => handleSelectFeedbackType('idea')}
          isActive={feedbackTypeSelected === 'idea'}
        />
      </li>
      <li>
        <FeedbackTypeButton
          label={other}
          onClick={() => handleSelectFeedbackType('other')}
          isActive={feedbackTypeSelected === 'other'}
        />
      </li>
    </ul>
  )
}
