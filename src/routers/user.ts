import { Router } from 'express'
import * as UserController from '../controllers/user'

const router = Router()

router.post('/', UserController.createUser)
router.get('/:id', UserController.getUser)

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
