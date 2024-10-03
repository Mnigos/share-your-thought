'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog'
import { usePathname, useRouter } from 'next/navigation'

import { ConnectForm } from '~/components/connect'

export default function LoginPage() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Dialog
      defaultOpen={true}
      open={pathname === '/connect'}
      onOpenChange={isOpen => {
        if (!isOpen) router.push('/')
      }}
    >
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader className="flex justify-center">
          <DialogTitle className="text-center text-3xl">
            Let&apos;s get started
          </DialogTitle>
        </DialogHeader>

        <ConnectForm />
      </DialogContent>
    </Dialog>
  )
}
