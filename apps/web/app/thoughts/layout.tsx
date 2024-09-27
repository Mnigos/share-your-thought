import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'
import { LogOut, User } from 'lucide-react'

import { logout } from '../actions/auth'
import { getCurrentUser } from '../actions/users'
import type { LayoutProps } from '../types/props'

export const runtime = 'edge'

export default async function ThoughtsLayout({ children }: LayoutProps) {
  const user = await getCurrentUser()

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
