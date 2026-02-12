import { vi } from 'vitest'
import * as UserController from '../../src/controllers/user.js'
import type { Request, Response } from 'express'

const mockRequest = (body?: object) => {
  return {
    body: body ?? {},
  } as unknown as Request
}

const mockResponse = () => {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
  }
  res.status.mockReturnValue(res)
  res.json.mockReturnValue(res)
  return res as unknown as Response
}

describe('createUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create user and return 201', async () => {
    const req = mockRequest({ name: 'John Doe', email: 'john@doe.ca' })
    const res = mockResponse()

    const id = Math.floor(0.5 * 1000000)
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    await UserController.createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        email: 'john@doe.ca',
        id: id,
        name: 'John Doe',
      },
    })
  })

  it('should not create user and return 400 if no email is specified', async () => {
    const req = mockRequest({ name: 'John Doe' })
    const res = mockResponse()

    await UserController.createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'User data is not formatted correctly',
    })
  })
})
