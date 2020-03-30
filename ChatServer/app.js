import express from 'express'
// import http from 'http'
import bodyParser from 'body-parser'
import _ from 'lodash'
import './api/database'
import passport from 'passport'
import cors from 'cors'
import setup from './api/database/passport_config'
import routers from './api/routes'
import { hostApi } from './api/database/config'

// import users from "./routes/users";
const path = require('path')

const app = express()

app.use(express.static(`${__dirname}/src`))
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// for parsing multipart/form-data
// app.use(upload.array())
// app.use(express.static('public'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.get('/abc', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src', 'app', 'index.jsx'))
})

app.use('/', routers)

app.use(passport.initialize())

setup(passport)

const list = []

function split(thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  }
  if (thing.fast_slash) {
    return ''
  }
  const match = thing
    .toString()
    .replace('\\/?', '')
    .replace('(?=\\/|$)', '$')
    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
  return match ? match[1].replace(/\\(.)/g, '$1').split('/') : `<complex:${thing.toString()}>`
}

function print(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    list.push(
      `${layer.method.toUpperCase()} /${path
        .concat(split(layer.regexp))
        .filter(Boolean)
        .join('/')}`
    )
  }
}

app._router.stack.forEach(print.bind(null, []))

_.uniq(list).forEach(rou => {
  console.log('TCL: rou', rou)
})

app.use((err, req, res, next) => {
  console.log('This is the invalid field ->', err.field)
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Authorization'
  )
  res.header('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  // if (err.status === 401) {
  //   res.send({
  //     message: 'Không có quyền truy cập',
  //   })
  // }
  // res.status(401).send({
  //   message: 'Không có quyền truy cập',
  // })

  next()
})

app.listen(hostApi, () => {
  console.log(`Server is listening on port ${hostApi}`)
})
