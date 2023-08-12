import express from 'express'
import { loginHandler, logoutUserHandler, refreshTokenHandler, registerHandler } from './auth.controller'
import { deserializeUser } from '../../middlewares/deserializeUser'
import { requireUser } from '../../middlewares/requireUser'

const router = express.Router()


router
    .post('/register', registerHandler)
    .post('/login', loginHandler)
    .get('/refresh', refreshTokenHandler)
    .get('/logout',deserializeUser, requireUser, logoutUserHandler)


export default router