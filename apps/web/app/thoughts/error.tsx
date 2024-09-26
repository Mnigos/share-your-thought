'use client'

import { useRouter } from 'next/navigation'

import type { ErrorProps } from '../types/props'

export default function ThoughtsError({ error }: ErrorProps) {
  const router = useRouter()

  if ('code' in error && error.code === 'NOT_FOUND') router.push('/')

  return <div>Error: {error.message}</div>
}
