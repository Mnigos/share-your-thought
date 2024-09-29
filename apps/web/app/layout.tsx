'use client'

import '@repo/ui/tailwind.css'

import { useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { LayoutProps } from './types/props'

namespace RootLayout {
  export type Props = Readonly<
    LayoutProps & {
      modal: ReactNode
    }
  >
}

function RootLayout({ children, modal }: RootLayout.Props) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <html lang="en">
      <body className="dark">
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen">{children}</div>
          {modal}
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
