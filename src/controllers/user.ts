import { type Request, type Response } from 'express'
import Joi from 'joi'
import * as rest from '../utils/rest.js'
import * as userStore from '../data/user-store.js'
import type { CreateUserInput } from '../data/user-store.js'

const CreateUserSchema = Joi.object<CreateUserInput>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
}).options({ stripUnknown: true })

export const listUsers = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const users = await userStore.findAll()
  res.status(200).json(rest.success(users))
}

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error, value } = CreateUserSchema.validate(req.body)
  if (error !== undefined) {
    res.status(400).json(rest.error('User data is not formatted correctly'))
    return
  }

  const user = await userStore.create(value)
  res.status(201).json(rest.success(user))
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string)
  if (Number.isNaN(id)) {
    res.status(400).json(rest.error('Invalid user ID'))
    return
  }

  const user = await userStore.findById(id)
  if (user === undefined) {
    res.status(404).json(rest.error('User not found'))
    return
  }

  res.status(200).json(rest.success(user))
}
