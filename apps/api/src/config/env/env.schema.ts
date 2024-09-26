import { z } from 'zod'

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(4000),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().optional().default(5432),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_URL: z.string(),
})

export type Env = z.infer<typeof envSchema>
