import { Button } from '@repo/ui/components/button'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const runtime = 'edge'

export default function Home() {
  const username = cookies().get('username')

  if (username) redirect('/thoughts')

  return (
    <section>
      <Button asChild>
        <Link href="/login" passHref>
          Get started
        </Link>
      </Button>
    </section>
  )
}
