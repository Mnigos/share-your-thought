import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function ThoughtsPage() {
  const username = cookies().get('username')

  if (!username) redirect('/thoughts')

  return (
    <div>
      <h1>Thoughts</h1>
    </div>
  )
}
