import express, { Application } from 'express'
import userRoutes from './api/users'

const app: Application = express()

app.use('/api/users', userRoutes)

export default app