import { revalidateTag } from 'next/cache'
import { mock } from 'vitest-mock-extended'

import { trpc } from '../trpc'
import type { Thought } from '../types/thoughts'
import type { User } from '../types/users'

import { createThought, getThoughts } from './thoughts'
import { getCurrentUser } from './users'

vi.mock('../trpc', () => ({
  trpc: {
    thought: {
      create: {
        query: vi.fn(),
      },
    },
    thoughts: {
      all: {
        query: vi.fn(),
      },
    },
  },
}))
vi.mock('./users')
vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  unstable_cache: vi.fn(fn => fn),
}))

describe('thoughts', () => {
  const authorId = 'authorId'
  const content = 'content'
  const authorMock = mock<User>({
    id: authorId,
  })
  const thoughtMock = mock<Thought>({
    id: 'id',
    content,
    author: authorMock,
  })

  test('should create thought', async () => {
    const content = 'content'

    const getCurrentUserSpy = vi
      .mocked(getCurrentUser)
      .mockResolvedValue(authorMock)
    const thoughtsCreateQuery = vi
      .spyOn(trpc.thought.create, 'query')
      .mockResolvedValue(thoughtMock)
    const revalidateTagSpy = vi.mocked(revalidateTag)

    expect(await createThought(content)).toEqual(thoughtMock)

    expect(getCurrentUserSpy).toHaveBeenCalled()
    expect(thoughtsCreateQuery).toHaveBeenCalledWith({
      content,
      authorId,
    })
    expect(revalidateTagSpy).toHaveBeenCalledWith('thoughts')
  })

  test('should get thoughts', async () => {
    const thoughts = [thoughtMock]

    const thoughtsAllQUery = vi
      .spyOn(trpc.thoughts.all, 'query')
      .mockResolvedValue(thoughts)

    expect(await getThoughts()).toEqual(thoughts)
    expect(thoughtsAllQUery).toHaveBeenCalled()
  })
})
