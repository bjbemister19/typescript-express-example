import express from 'express'
import userRouter from './routers/user.js'
import * as rest from './utils/rest.js'

const PORT = process.env.PORT ?? 5001

const app = express()

app.use(express.json())

/**
 * If your frontend is served from a different origin (e.g. a React dev
 * server on port 3000), you will need CORS middleware:
 *
 *   import cors from 'cors'
 *   app.use(cors())
 *
 * Install it with: bun add cors && bun add -d @types/cors
 */

app.get('/health', (_req, res) => {
  res.status(200).json(rest.success({ status: 'healthy' }))
})

app.use('/api/user', userRouter)

/**
 * Exercise:
 * Implement a new data model and corresponding API. At the end of the day you should
 * create a model that interests you, and progresses your project in some way, but if
 * you can't think of anything, try creating a model for a collection of books which
 * may have the following properties:
 *  - ISBN
 *  - title
 *  - author
 *  - etc...
 * and lives at /api/book
 *
 * Whatever you decide be sure to implement the full set of POST, GET, PUT, and DELETE
 * operations assuming that makes sense in your case.
 */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
