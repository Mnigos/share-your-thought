import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { User } from 'lucide-react'

import { trpc } from '../trpc'
import type { LayoutProps } from '../types/props'

export const runtime = 'edge'

export default async function ThoughtsLayout({ children }: LayoutProps) {
  const username = cookies().get('username')?.value

  if (!username) redirect('/thoughts')

  const user = await trpc.users.byName.query({ name: username })

  return (
    <div>
      <nav className="flex w-full justify-end bg-black px-4 py-2">
        <div className="flex items-center gap-2">
          <p className="text-lg">{user.name}</p>
          <User />
        </div>
      </nav>

      <main>{children}</main>
    </div>
  )
}
