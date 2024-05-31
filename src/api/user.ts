import { Router, type Request, type Response } from 'express'
import * as rest from '../utils/rest'
import Joi from 'joi'

const router = Router()

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

router.post('/', (req: Request, res: Response) => {
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
})

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json(rest.error('Invalid user ID'))
  }

  const user = DEMO_USERS.find(u => u.id === id)
  if (user === undefined) {
    return res.status(404).json(rest.error('User not found'))
  }

  return res.status(200).json(rest.success(user))
})

/**
 * Exercise:
 * 1. Implement PUT /api/user/:id
 *  - Put user should update the properties of an existing user given an ID, and the properties to update.
 *  - The body of the request will effectively be the same as the post, but instead of creating a new user, you
 *    should find the user that matches the given ID and update the properties of that user.
 *  - Be sure to validate the body of the request to ensure that the user data is formatted correctly.
 *  - Check your implementation by using postman to send a PUT request to http://localhost:3000/api/user/{{some_id}}
 *
 * 2. Implement DELETE /api/user/:id
 *  - Delete user should delete the user with the given ID.
 *  - Check your implementation by using postman to send a DELETE request to http://localhost:3000/api/user/{{some_id}}
 */

export default router
