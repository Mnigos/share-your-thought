'use server'

import { unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { trpc } from '../../lib/trpc'

export async function getCurrentUser() {
  const username = cookies().get('username')?.value

  if (!username) redirect('/')

  return unstable_cache(() => trpc.user.byName.query(username), [username])()
}
