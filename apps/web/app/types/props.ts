import type { ReactNode } from 'react'

export type LayoutProps = Readonly<{
  children: ReactNode
}>

export type ErrorProps = Readonly<{
  error: Error & { digest?: string }
  reset: () => void
}>

export type EditThoughtPageProps = Readonly<{
  params: Readonly<{
    id: string
  }>
}>
