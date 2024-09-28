import { revalidateTag } from 'next/cache'
import { mock } from 'vitest-mock-extended'

import { trpc } from '../trpc'
import type { Thought } from '../types/thoughts'
import type { User } from '../types/users'

import {
  createThought,
  editThought,
  getThoughtById,
  getThoughts,
} from './thoughts'
import { getCurrentUser } from './users'

vi.mock('../trpc', () => ({
  trpc: {
    thought: {
      create: {
        query: vi.fn(),
      },
      edit: {
        query: vi.fn(),
      },
      byId: {
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
  const id = 'id'
  const authorId = 'authorId'
  const content = 'content'
  const authorMock = mock<User>({
    id: authorId,
  })
  const thoughtMock = mock<Thought>({
    id,
    content,
    author: authorMock,
  })

  test('should get thoughts', async () => {
    const thoughts = [thoughtMock]

    const thoughtsAllQUery = vi
      .spyOn(trpc.thoughts.all, 'query')
      .mockResolvedValue(thoughts)

    expect(await getThoughts()).toEqual(thoughts)
    expect(thoughtsAllQUery).toHaveBeenCalled()
  })

  test('should create thought', async () => {
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

  test('should edit thought', async () => {
    const thoughtsEditQuery = vi
      .spyOn(trpc.thought.edit, 'query')
      .mockResolvedValue(thoughtMock)
    const revalidateTagSpy = vi.mocked(revalidateTag)

    expect(await editThought(content, id)).toEqual(thoughtMock)

    expect(thoughtsEditQuery).toHaveBeenCalledWith({
      content,
      id,
    })
    expect(revalidateTagSpy).toHaveBeenCalledWith('thoughts')
  })

  test('should get thought by id', async () => {
    const thoughtsByIdQuery = vi
      .spyOn(trpc.thought.byId, 'query')
      .mockResolvedValue(thoughtMock)

    expect(await getThoughtById(id)).toEqual(thoughtMock)

    expect(thoughtsByIdQuery).toHaveBeenCalledWith(id)
  })
})
