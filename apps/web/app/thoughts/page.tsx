import { Card } from '@repo/ui/components/card'

import { getThoughts } from '~/server/actions/thoughts'
import { getCurrentUser } from '~/server/actions/users'
import { ThoughtForm, ThoughtCard } from '~/components/thoughts'

export default async function ThoughtsPage() {
  const currentUser = await getCurrentUser()
  const thoughts = await getThoughts()

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-6">
      <Card>
        <ThoughtForm />
      </Card>

      <section className="flex flex-col gap-2">
        {thoughts.map(thought => (
          <ThoughtCard
            key={thought.id}
            currentUserId={currentUser.id}
            {...thought}
          />
        ))}
      </section>
    </div>
  )
}
