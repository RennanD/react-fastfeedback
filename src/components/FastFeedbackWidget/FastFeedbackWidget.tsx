import { ReactNode } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { tw } from '../../utils/tw'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackSchema } from '../../validations/feedbackSchema'
import { FeedbackTypeInput } from './FeedbackTypeInput'
import { ScreenshotButton } from './ScreenshotButton'

interface FastFeedbackWidgetProps {
  children: ReactNode
  side?: 'bottom' | 'left' | 'right' | 'top'
  className?: string
}

type FeedbackFormValues = z.infer<typeof feedbackSchema>

export function FastFeedbackWidget({
  children,
  side = 'left',
  className,
}: FastFeedbackWidgetProps) {
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      description: '',
      screenshot: '',
    },
  })

  const { errors, isSubmitting } = form.formState

  const { field: typeField } = useController({
    name: 'type',
    control: form.control,
  })
  const { field: screenshotField } = useController({
    name: 'screenshot',
    control: form.control,
  })

  function handleSubmitForm(data: FeedbackFormValues) {
    console.log({ ...data, page: window.location.href })

    form.reset()
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Content sideOffset={8} side={side} align="end">
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
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

          <div className="space-y-px">
            <FeedbackTypeInput
              value={typeField.value}
              onChange={(value) => typeField.onChange(value)}
            />
            {errors.type && (
              <span className="text-xs text-red-400">
                {errors.type.message}
              </span>
            )}
          </div>

          <div className="space-y-px">
            <textarea
              placeholder="Escreva seu feedback..."
              className="resize-none text-sm placeholder:text-gray-200 p-2 text-gray-900 h-20 rounded border-gray-300 w-full border"
              {...form.register('description')}
            ></textarea>
            {errors.description && (
              <span className="text-xs text-red-400">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <button
              type="submit"
              className="w-full flex items-center h-8 justify-center px-4 py-2 rounded text-sm font-bold bg-cyan-500 text-white hover:bg-cyan-700 transition-colors"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar feedback'}
            </button>

            <ScreenshotButton
              onCapture={(image) => screenshotField.onChange(image)}
            />
          </div>
        </form>
      </Popover.Content>
    </Popover.Root>
  )
}