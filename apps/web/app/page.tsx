import { Button } from '@repo/ui/components/button'

import { trpc } from './trpc'

export const runtime = 'edge'

export default async function Home() {
  const hello = await trpc.hello.getHello.query()

  return (
    <main>
      <h1 className="text-red-500">{hello}</h1>
      <Button>Click me</Button>
    </main>
  )
}
