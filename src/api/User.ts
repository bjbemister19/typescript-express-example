import { Router } from 'express'
import { error, success } from './REST'
import { type User, UserCodec } from '../models'
import { isLeft } from 'fp-ts/lib/Either'

const router = Router()

let DEMO_USER: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@doe.com'
}

router.post('/', (req, res) => {
  const validationResult = UserCodec.decode(req.body)
  if (isLeft(validationResult)) {
    return res.status(400).json(error('User data is not formatted correctly'))
  }
  const user = validationResult.right

  /** Do some stuff, for now just set demo variable */
  DEMO_USER = user

  return res.status(204).end()
})

router.get('/', (_req, res) => {
  return res.json(success(DEMO_USER))
})

export default router
