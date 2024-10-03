import { z } from 'zod'

import { userSchema } from '../users/user.schema'

export const thoughtSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: userSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createThoughtSchema = thoughtSchema
  .pick({
    content: true,
  })
  .extend({
    authorId: z.string(),
  })

export const editThoughtSchema = thoughtSchema.pick({
  content: true,
  id: true,
})
