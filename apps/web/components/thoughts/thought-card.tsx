import { Button } from '@repo/ui/components/button'
import { Card, CardContent, CardHeader } from '@repo/ui/components/card'
import { Pencil, User } from 'lucide-react'
import Link from 'next/link'

import type { Thought } from '../../server/types/thoughts'

namespace ThoughtCard {
  export type Props = Readonly<
    Pick<Thought, 'content' | 'author' | 'id'> & {
      currentUserId: string
    }
  >
}

function ThoughtCard({
  id,
  content,
  author,
  currentUserId,
}: ThoughtCard.Props) {
  return (
    <Card className="flex flex-col gap-2 px-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <User />

          <div>
            <p className="text-lg">{author.name}</p>
            <p className="text-muted-foreground text-xs">
              {new Date(author.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {currentUserId === author.id && (
          <Button variant="outline" className="gap-2" size="icon" asChild>
            <Link href={`/thought/${id}/edit`} passHref>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>

      <CardContent className="text-lg text-neutral-50">{content}</CardContent>
    </Card>
  )
}

export { ThoughtCard }
