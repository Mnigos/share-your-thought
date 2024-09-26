import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { User, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'
import { Button } from '@repo/ui/components/button'
import { unstable_cache } from 'next/cache'

import { trpc } from '../trpc'
import type { LayoutProps } from '../types/props'
import { logout } from '../actions/auth'

export const runtime = 'edge'

export default async function ThoughtsLayout({ children }: LayoutProps) {
  const username = cookies().get('username')?.value

  if (!username) redirect('/thoughts')

  const getUserByName = unstable_cache(
    (name: string) => trpc.user.byName.query({ name }),
    [username]
  )

  const user = await getUserByName(username)

  return (
    <div>
      <nav className="flex w-full justify-end bg-black px-4 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2" asChild>
            <Button variant="outline">
              <p className="text-lg">{user.name}</p>
              <User />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <form action={logout}>
              <DropdownMenuItem className="flex items-center gap-2" asChild>
                <Button variant="destructive" className="w-full" type="submit">
                  <LogOut />
                  Logout
                </Button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <main>{children}</main>
    </div>
  )
}
