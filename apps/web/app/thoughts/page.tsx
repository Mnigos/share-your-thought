import { getThoughts } from '../actions/thoughts'
import { getCurrentUser } from '../actions/users'
import { CreateThoughtForm, ThoughtCard } from '../components/thoughts'

export default async function ThoughtsPage() {
  const currentUser = await getCurrentUser()
  const thoughts = await getThoughts()

  return (
    <div className="p-4">
      <h1>Thoughts</h1>

      <div className="mx-auto max-w-[1100px]">
        <CreateThoughtForm />

        <section>
          <header>
            <h2>Recent thoughts</h2>
          </header>

          <div className="flex flex-col gap-2">
            {thoughts.toReversed().map(({ id, content, author }) => (
              <ThoughtCard
                key={id}
                id={id}
                content={content}
                author={author}
                currentUserId={currentUser.id}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
