import express from 'express'
import { createCapsule, getAllCapsules } from '../controllers/capsule.controller'
import { tokenAuthentication } from '../middlewares/userAuthentication'

export const capsule = express.Router()

capsule.post('/create',tokenAuthentication, createCapsule)
capsule.get('/myCapsules', tokenAuthentication, getAllCapsules)