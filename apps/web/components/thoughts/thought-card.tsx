import { Button } from '@repo/ui/components/button'
import { Card, CardContent, CardHeader } from '@repo/ui/components/card'
import { Pencil, User } from 'lucide-react'
import Link from 'next/link'

import type { Thought } from '~/server/types/thoughts'

namespace ThoughtCard {
  export type Props = Readonly<
    Thought & {
      currentUserId: string
    }
  >
}

function ThoughtCard({
  id,
  content,
  author,
  updatedAt,
  createdAt,
  currentUserId,
}: ThoughtCard.Props) {
  return (
    <div className="group relative">
      {currentUserId === author.id && (
        <Button
          variant="outline"
          className="bg-card absolute -top-2 right-4 gap-2 opacity-0 transition-opacity duration-150 ease-in-out group-hover:opacity-100"
          size="xs"
          asChild
        >
          <Link href={`/thought/${id}/edit`} passHref>
            <Pencil className="h-3 w-3" />
            Edit
          </Link>
        </Button>
      )}

      <Card className="grid grid-cols-[24px_1fr] grid-rows-[40px_1fr] gap-x-2">
        <User className="place-self-center" />

        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="font-semibold leading-5">{author.name}</p>
            <p className="text-muted-foreground text-xs">
              {new Date(author.createdAt).toLocaleDateString()}
            </p>
          </div>

          {createdAt !== updatedAt && (
            <p className="pr-2 text-xs text-neutral-400">(edited)</p>
          )}
        </CardHeader>

        <div />

        <CardContent className="text-neutral-50">{content}</CardContent>
      </Card>
    </div>
  )
}

export { ThoughtCard }
