'use server'

import { cookies } from 'next/headers'

import { trpc } from '../trpc'

export async function login(name: string) {
  const user = await trpc.user.login.query({
    name,
  })

  cookies().set('username', user.name)

  return user
}
