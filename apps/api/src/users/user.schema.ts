import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
})

export const createUserSchema = userSchema.pick({ name: true })
