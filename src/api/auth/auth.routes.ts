import express from 'express'
import { loginHandler, refreshTokenHandler, registerHandler } from './auth.controller'

const router = express.Router()


router
    .post('/register', registerHandler)
    .post('/login', loginHandler)
    .get('/refresh', refreshTokenHandler)


export default router