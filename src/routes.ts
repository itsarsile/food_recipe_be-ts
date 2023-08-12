import express, { Application } from 'express'
import userRoutes from './api/users'
import authRoutes from './api/auth'
import passport from 'passport'

const app: Application = express()

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

export default app