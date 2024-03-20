import { ReactNode, useState } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { tw } from '../../utils/tw'
import { FeedbackTypeButton } from './FeedbackTypeButton'

interface FastFeedbackWidgetProps {
  children: ReactNode
  side?: 'bottom' | 'left' | 'right' | 'top'
  className?: string
}

export function FastFeedbackWidget({
  children,
  side = 'left',
  className,
}: FastFeedbackWidgetProps) {
  const [feedbackTypeSelected, setFeedbackTypeSelected] = useState('')

  function handleSelectFeedbackType(type: string) {
    setFeedbackTypeSelected(type)
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Content sideOffset={8} side={side} align="end">
        <div
          className={tw(
            'rounded-[5px] flex flex-col gap-4 shadow-sm p-5 max-w-xs w-full bg-white will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade',
            className,
          )}
        >
          <div>
            <h3 className="text-gray-900 text-xl font-bold">
              O que está na sua mente?
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Descreva seu feedback para que possamos ajudar da melhor forma
              possível! 🙂
            </p>
          </div>

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
                onClick={() => handleSelectFeedbackType('others')}
                isActive={feedbackTypeSelected === 'others'}
              />
            </li>
          </ul>

          <textarea
            name=""
            id=""
            placeholder="Escreva seu feedback..."
            className="resize-none text-sm placeholder:text-gray-200 p-2 text-gray-900 h-20 rounded border-gray-300 w-full border"
          ></textarea>

          <button className="w-full flex items-center justify-center px-4 py-2 rounded text-sm font-bold bg-cyan-500 text-white">
            Enviar feedback
          </button>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
