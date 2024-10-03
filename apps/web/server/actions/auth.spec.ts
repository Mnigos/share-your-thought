import { mock } from 'vitest-mock-extended'
import { cookies } from 'next/headers'

import type { User } from '../types/users'

import { connect, disconnect } from './auth'

import { trpc } from '~/lib/trpc'

vi.mock('next/headers')
vi.mock('~/lib/trpc', () => ({
  trpc: {
    user: {
      connect: {
        query: vi.fn(),
      },
    },
  },
}))

describe('auth', () => {
  test('should connect', async () => {
    const name = 'test'
    const userMock = mock<User>({
      name,
    })

    const userLoginQuerySpy = vi
      .spyOn(trpc.user.connect, 'query')
      .mockResolvedValue(userMock)
    const cookiesSetSpy = vi.fn()
    vi.mocked(cookies).mockReturnValue({
      set: cookiesSetSpy,
    } as unknown as ReturnType<typeof cookies>)

    expect(await connect(name)).toEqual(userMock)
    expect(userLoginQuerySpy).toHaveBeenCalledWith({
      name,
    })
    expect(cookiesSetSpy).toHaveBeenCalledWith('username', userMock.name)
  })

  test('should disconnect', async () => {
    const cookiesDeleteSpy = vi.fn()
    vi.mocked(cookies).mockReturnValue({
      delete: cookiesDeleteSpy,
    } as unknown as ReturnType<typeof cookies>)

    await expect(disconnect()).rejects.toThrow('NEXT_REDIRECT')

    expect(cookiesDeleteSpy).toHaveBeenCalledWith('username')
  })
})
