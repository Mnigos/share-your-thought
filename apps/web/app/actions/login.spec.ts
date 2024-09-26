import { mock } from 'vitest-mock-extended'
import { cookies } from 'next/headers'

import { trpc } from '../trpc'

import { login } from './login'

vi.mock('next/headers')
vi.mock('../trpc', () => ({
  trpc: {
    users: {
      login: {
        query: vi.fn(),
      },
    },
  },
}))

describe('login', () => {
  test('should login', async () => {
    const name = 'test'
    const userMock = mock<Awaited<ReturnType<typeof login>>>({
      name,
    })

    const loginQuerySpy = vi
      .spyOn(trpc.users.login, 'query')
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
})
