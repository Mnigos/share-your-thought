import { Button } from '@repo/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'
import { LogOut, User } from 'lucide-react'
import type { ReactNode } from 'react'

import type { LayoutProps } from '../types/props'

import { getCurrentUser } from '~/server/actions/users'
import { logout } from '~/server/actions/auth'

export const runtime = 'edge'

namespace ThoughtsLayout {
  export type Props = Readonly<
    LayoutProps & {
      modal: ReactNode
    }
  >
}

async function ThoughtsLayout({ children, modal }: ThoughtsLayout.Props) {
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

      {modal}
    </div>
  )
}

export default ThoughtsLayout
