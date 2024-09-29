import { getThoughts } from '../../server/actions/thoughts'
import { getCurrentUser } from '../../server/actions/users'
import { ThoughtForm, ThoughtCard } from '../../components/thoughts'

export default async function ThoughtsPage() {
  const currentUser = await getCurrentUser()
  const thoughts = await getThoughts()

  return (
    <div className="p-4">
      <h1>Thoughts</h1>

      <div className="mx-auto max-w-[1100px]">
        <ThoughtForm />

        <section>
          <header>
            <h2>Recent thoughts</h2>
          </header>

          <div className="flex flex-col gap-2">
            {thoughts.map(({ id, content, author }) => (
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
