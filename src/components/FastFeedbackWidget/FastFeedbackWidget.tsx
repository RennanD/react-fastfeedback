import { ReactNode, useState } from 'react'

import * as Popover from '@radix-ui/react-popover'
import { tw } from '../../utils/tw'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackSchema } from '../../validations/feedbackSchema'
import { FeedbackTypeInput } from './FeedbackTypeInput'
import { ScreenshotButton } from './ScreenshotButton'
import { api } from '../../lib/axios'
import { CheckIcon } from '../CheckIcon/CheckIcon'
import { detectOS } from '../../utils/detectOS'
import { detectBrowser } from '../../utils/detectBrowser'
import { LOCALES } from '../../utils/locales'

interface FastFeedbackWidgetProps {
  children: ReactNode
  side?: 'bottom' | 'left' | 'right' | 'top'
  className?: string
  projectId: string
  language?: 'en' | 'es' | 'pt-br' | 'fr' | 'de' | 'pt-pt'
}

type FeedbackFormValues = z.infer<typeof feedbackSchema>

type SubmitedFormStatus = 'waiting' | 'successed' | 'errored'

export function FastFeedbackWidget({
  children,
  side = 'left',
  className,
  language = 'en',
  projectId,
}: FastFeedbackWidgetProps) {
  const {
    headline,
    description,
    placeholer,
    button,
    errors: localeErrors,
  } = LOCALES[language]

  const [submitedFormStatus, setSubmitedFormStatus] =
    useState<SubmitedFormStatus>('waiting')

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      description: '',
      screenshot: '',
      type: undefined,
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

  async function handleSubmitForm(data: FeedbackFormValues) {
    try {
      const userOs = detectOS()
      const userBrowser = detectBrowser()

      const device = `${userBrowser} | ${userOs} `

      await api.post('/feedback/public', {
        ...data,
        device,
        projectId,
        pageUrl: window.location.href,
      })
      form.reset()
      setSubmitedFormStatus('successed')

      setTimeout(() => {
        setSubmitedFormStatus('waiting')
      }, 2000)
    } catch (error) {
      console.log(error)
      setSubmitedFormStatus('errored')

      setTimeout(() => {
        setSubmitedFormStatus('waiting')
      }, 2000)
    }
  }

  if (!projectId) {
    throw new Error('Project Id is required')
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Content sideOffset={8} side={side} align="end">
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className={tw(
            'rounded-[5px] flex flex-col gap-4 shadow-sm p-5 max-w-xs w-full bg-card will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade',
            className,
          )}
        >
          <div>
            <h3 className="text-foreground text-xl font-bold">{headline}</h3>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          </div>

          <div className="space-y-px">
            <FeedbackTypeInput
              language={language}
              value={typeField.value}
              onChange={(value) => typeField.onChange(value)}
            />
            {errors.type && (
              <span className="text-xs text-red-400">
                {localeErrors.feedbackType}
              </span>
            )}
          </div>

          <div className="space-y-px">
            <textarea
              placeholder={placeholer}
              className="resize-none text-sm placeholder:text-muted-foreground p-2 text-foreground h-20 rounded border-gray-300 w-full border"
              {...form.register('description')}
            ></textarea>
            {errors.description && (
              <span className="text-xs text-red-400">
                {localeErrors.feedbackText}
              </span>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <button
              type="submit"
              className="w-full flex items-center h-8 justify-center px-4 py-2 rounded text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {isSubmitting ? button.loading : button.default}
            </button>

            <ScreenshotButton
              defaultImage={screenshotField.value}
              onCapture={(image) => screenshotField.onChange(image)}
            />
          </div>

          {submitedFormStatus === 'successed' && (
            <div className="flex items-center gap-2">
              <CheckIcon />
              <span className="text-xs text-emerald-500">
                Feedback enviado com sucesso
              </span>
            </div>
          )}

          {submitedFormStatus === 'errored' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-500">
                Não foi possível enivar o feedback
              </span>
            </div>
          )}
        </form>
      </Popover.Content>
    </Popover.Root>
  )
}
