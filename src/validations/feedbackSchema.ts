import { z } from 'zod'

export const feedbackSchema = z.object({
  type: z.enum(['bug', 'idea', 'other'], {
    errorMap: () => {
      return {
        message: 'Selecione um tipo de feedback',
      }
    },
  }),
  description: z.string().min(1, 'Descreva seu feedback'),
  screenshot: z.string().optional(),
})
