import { User } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@repo/ui/components/card'

import type { Thought } from '../../types/thoughts'

export function ThoughtCard({
  content,
  author,
}: Readonly<Pick<Thought, 'content' | 'author'>>) {
  return (
    <Card className="flex flex-col gap-2 px-4">
      <CardHeader className="flex flex-row items-center gap-2">
        <User />
        <div>
          <p className="text-lg">{author.name}</p>
          <p className="text-muted-foreground text-xs">
            {new Date(author.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>

      <CardContent className="text-lg text-neutral-50">{content}</CardContent>
    </Card>
  )
}
