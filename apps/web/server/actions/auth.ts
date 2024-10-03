'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { trpc } from '~/lib/trpc'

export async function connect(name: string) {
  const user = await trpc.user.connect.query({
    name,
  })

  cookies().set('username', user.name)

  return user
}

export async function disconnect() {
  cookies().delete('username')

  redirect('/')
}
