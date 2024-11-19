import express from "express"

import { login, registerUser } from "../controllers/user.controller"

export const user = express.Router()

user.post('/register', registerUser)
user.post('/login', login)