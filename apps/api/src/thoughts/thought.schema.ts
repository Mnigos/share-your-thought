import { z } from 'zod'

import { userSchema } from '../users'

export const thoughtSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: userSchema,
  createdAt: z.date(),
})

export const createThoughtSchema = thoughtSchema
  .pick({
    content: true,
  })
  .extend({
    authorId: z.string(),
  })
