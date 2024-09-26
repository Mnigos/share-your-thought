import { mock } from 'vitest-mock-extended'
import { cookies } from 'next/headers'

import { trpc } from '../trpc'

import { login, logout } from './auth'

vi.mock('next/headers')
vi.mock('../trpc', () => ({
  trpc: {
    user: {
      login: {
        query: vi.fn(),
      },
    },
  },
}))

describe('auth', () => {
  test('should login', async () => {
    const name = 'test'
    const userMock = mock<Awaited<ReturnType<typeof login>>>({
      name,
    })

    const loginQuerySpy = vi
      .spyOn(trpc.user.login, 'query')
      .mockResolvedValue(userMock)
    const cookiesSetSpy = vi.fn()
    vi.mocked(cookies).mockReturnValue({
      set: cookiesSetSpy,
    } as unknown as ReturnType<typeof cookies>)

    expect(await login(name)).toEqual(userMock)
    expect(loginQuerySpy).toHaveBeenCalledWith({
      name,
    })
    expect(cookiesSetSpy).toHaveBeenCalledWith('username', userMock.name)
  })

  test('should logout', async () => {
    const cookiesDeleteSpy = vi.fn()
    vi.mocked(cookies).mockReturnValue({
      delete: cookiesDeleteSpy,
    } as unknown as ReturnType<typeof cookies>)

    await expect(logout()).rejects.toThrow('NEXT_REDIRECT')

    expect(cookiesDeleteSpy).toHaveBeenCalledWith('username')
  })
})
