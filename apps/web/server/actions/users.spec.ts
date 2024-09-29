import { mock } from 'vitest-mock-extended'
import { cookies } from 'next/headers'
import type { MockInstance } from 'vitest'

import { trpc } from '../../lib/trpc'
import type { User } from '../types/users'

import { getCurrentUser } from './users'

vi.mock('../../lib/trpc', () => ({
  trpc: {
    user: {
      byName: {
        query: vi.fn(),
      },
    },
  },
}))
vi.mock('next/cache', () => ({
  unstable_cache: vi.fn(fn => fn),
}))
vi.mock('next/headers')

describe('users', () => {
  const name = 'test'
  const userMock = mock<User>({
    name,
  })

  describe('getCurrentUser', () => {
    const cookiesGetSpy = vi.fn()

    let cookiesMock: MockInstance
    let userByNameQuerySpy: MockInstance

    beforeEach(() => {
      cookiesMock = vi.mocked(cookies)
      userByNameQuerySpy = vi.spyOn(trpc.user.byName, 'query')
    })

    test('should get current user', async () => {
      cookiesGetSpy.mockReturnValue({
        value: name,
      })
      cookiesMock.mockReturnValue({
        get: cookiesGetSpy,
      } as unknown as ReturnType<typeof cookies>)
      userByNameQuerySpy.mockResolvedValue(userMock)

      expect(await getCurrentUser()).toEqual(userMock)

      expect(cookiesGetSpy).toHaveBeenCalledWith('username')
      expect(userByNameQuerySpy).toHaveBeenCalledWith(name)
    })

    test('should redirect if not found', async () => {
      cookiesGetSpy.mockReturnValue(null)

      vi.mocked(cookies).mockReturnValue({
        get: cookiesGetSpy,
      } as unknown as ReturnType<typeof cookies>)

      await expect(getCurrentUser()).rejects.toThrow('NEXT_REDIRECT')

      expect(cookiesGetSpy).toHaveBeenCalledWith('username')
      expect(userByNameQuerySpy).not.toHaveBeenCalled()
    })
  })
})
