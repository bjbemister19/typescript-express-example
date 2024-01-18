import * as express from 'express'
import { userRouter } from './api'

const PORT = process.env.PORT ?? 5001

const app = express()

app.use(express.json())
app.use('/api/user', userRouter)

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
