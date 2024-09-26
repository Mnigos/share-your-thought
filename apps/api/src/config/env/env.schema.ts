import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(4000),
  DATABASE_HOST: z.coerce.string(),
  DATABASE_PORT: z.coerce.number().optional().default(5432),
  DATABASE_USERNAME: z.coerce.string(),
  DATABASE_PASSWORD: z.coerce.string(),
  DATABASE_NAME: z.coerce.string(),
})

export type Env = z.infer<typeof envSchema>
