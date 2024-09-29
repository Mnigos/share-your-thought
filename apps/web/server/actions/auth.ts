'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { trpc } from '../../lib/trpc'

export async function login(name: string) {
  const user = await trpc.user.login.query({
    name,
  })

  cookies().set('username', user.name)

  return user
}

export async function logout() {
  cookies().delete('username')

  redirect('/')
}
