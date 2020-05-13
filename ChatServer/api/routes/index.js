import express from 'express'
import V1 from './v1'

const Router = express.Router()

Router.use('/v1', V1)

export default Router
