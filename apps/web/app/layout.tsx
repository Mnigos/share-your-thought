import '@repo/ui/tailwind.css'
import type { ReactNode } from 'react'

import type { LayoutProps } from './types/props'

namespace RootLayout {
  export type Props = Readonly<
    LayoutProps & {
      modal: ReactNode
    }
  >
}

function RootLayout({ children, modal }: RootLayout.Props) {
  return (
    <html lang="en">
      <body className="dark">
        <div className="min-h-screen">{children}</div>
        {modal}
      </body>
    </html>
  )
}

export default RootLayout
