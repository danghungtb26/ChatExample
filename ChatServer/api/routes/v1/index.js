import express from 'express'
import Auth from './auth'

const Router = express.Router()

Router.use(Auth)

export default Router
