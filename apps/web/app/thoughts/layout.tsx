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
import { disconnect } from '~/server/actions/auth'

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
    <div className="flex flex-col gap-4">
      <nav className="flex w-full justify-end bg-black">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="hover:bg-foreground hover:text-background data-[state=open]:text-background data-[state=open]:bg-foreground flex items-center gap-2 border-0"
            asChild
          >
            <Button variant="outline">
              <p className="text-lg">{user.name}</p>
              <User />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <form action={disconnect}>
              <DropdownMenuItem className="flex items-center gap-2" asChild>
                <Button
                  variant="destructive"
                  className="w-full"
                  type="submit"
                  size="sm"
                >
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
