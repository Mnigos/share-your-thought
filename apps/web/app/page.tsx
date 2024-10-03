import { Button } from '@repo/ui/components/button'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Home() {
  const username = cookies().get('username')

  if (username) redirect('/thoughts')

  return (
    <main>
      <Button asChild>
        <Link href="/connect" passHref>
          Get started
        </Link>
      </Button>
    </main>
  )
}
