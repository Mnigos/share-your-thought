import { Test, type TestingModule } from '@nestjs/testing'
import type { User } from '@prisma/client'
import { mock } from 'vitest-mock-extended'
import type { MockInstance } from 'vitest'

import { PrismaService } from '../config/prisma'

import { UsersRouter } from './users.router'

describe('UsersRouter', () => {
  let moduleReference: TestingModule
  let usersRouter: UsersRouter
  let prisma: PrismaService

  beforeAll(async () => {
    moduleReference = await Test.createTestingModule({
      providers: [
        UsersRouter,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: vi.fn(),
              findFirst: vi.fn(),
            },
          },
        },
      ],
    }).compile()

    usersRouter = moduleReference.get(UsersRouter)
    prisma = moduleReference.get(PrismaService)
  })

  afterAll(async () => {
    await moduleReference.close()
  })

  test('should be defined', () => {
    expect(usersRouter).toBeDefined()
  })

  describe('login', () => {
    const name = 'test'
    const userMock = mock<User>({
      name,
    })

    let userFindFirstSpy: MockInstance
    let userCreateSpy: MockInstance

    beforeEach(() => {
      userFindFirstSpy = vi.spyOn(prisma.user, 'findFirst')
      userCreateSpy = vi.spyOn(prisma.user, 'create')
    })

    test('should return found user', async () => {
      userFindFirstSpy.mockResolvedValue(userMock)

      expect(await usersRouter.login(name)).toEqual(userMock)

      expect(userFindFirstSpy).toHaveBeenCalledWith({
        where: {
          name,
        },
      })
      expect(userCreateSpy).not.toHaveBeenCalled()
    })

    test('should create account if not found', async () => {
      userFindFirstSpy.mockResolvedValue(null)
      userCreateSpy.mockResolvedValue(userMock)

      expect(await usersRouter.login(name)).toEqual(userMock)

      expect(userFindFirstSpy).toHaveBeenCalledWith({
        where: {
          name,
        },
      })
      expect(userCreateSpy).toHaveBeenCalledWith({
        data: {
          name,
        },
      })
    })
  })
})
