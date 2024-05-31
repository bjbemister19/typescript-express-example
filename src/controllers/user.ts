import { type Request, type Response } from 'express'
import * as rest from '../utils/rest'
import Joi from 'joi'

const DEMO_USERS: User[] = []
DEMO_USERS.push({
  id: 12345,
  name: 'John Doe',
  email: 'john@doe.com'
})

type email = string

export interface User {
  id?: number
  name: string
  email: email
}

const UserSchema = Joi.object<User>({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required()
})

export const createUser = (req: Request, res: Response) => {
    const {error, value} = UserSchema.validate(req.body)
    if (error !== undefined) {
      return res.status(400).json(rest.error('User data is not formatted correctly'))
    }
  
    const user = value;
    if ('id' in user) {
      return res.status(400).json(rest.error('User ID will be generated automatically'))
    }
  
    const id = Math.floor(Math.random() * 1000000)
  
    const createdUser = {
      ...user,
      id
    }
    DEMO_USERS.push(createdUser)
  
    return res.status(200).json(rest.success(createdUser))
}

export const getUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json(rest.error('Invalid user ID'))
  }

  const user = DEMO_USERS.find(u => u.id === id)
  if (user === undefined) {
    return res.status(404).json(rest.error('User not found'))
  }

  return res.status(200).json(rest.success(user))
}
