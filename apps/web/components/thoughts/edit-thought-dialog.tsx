'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog'
import { usePathname, useRouter } from 'next/navigation'

import { ThoughtForm } from './thought-form'

export function EditThoughtDialog({
  thought,
}: Readonly<Required<ThoughtForm.Props>>) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Dialog
      defaultOpen={true}
      open={pathname.split('/').at(-1) === 'edit'}
      onOpenChange={isOpen => {
        if (!isOpen) router.push('/thoughts')
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit thought</DialogTitle>
        </DialogHeader>

        <ThoughtForm thought={thought} />
      </DialogContent>
    </Dialog>
  )
}
