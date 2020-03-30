/* eslint-disable no-underscore-dangle */
import express from 'express'
import passport from 'passport'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import table from '../../../database/tableName'
import { UserSchema } from '../../../database/Schemas'
import { secretkey } from '../../../database/config'
import { generateHash } from '../../../database/Schemas/User'
import upload from '../../../commons/upload'

const User = mongoose.model(table.user, UserSchema)

const authRouters = express.Router()

authRouters.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.user._id)
    .then(r => {
      if (r) {
        const dataUser = r.bindJson()
        res.json({
          success: true,
          message: '',
          data: { ...dataUser },
        })
      } else {
        res.status(403)
        res.json({
          success: false,
          message: 'user not found',
        })
      }
    })
    .catch(() => {
      res.status(403)
      res.json({
        success: false,
        message: 'user not found',
      })
    })
})

authRouters.put('/me', () => {})

authRouters.post('/sign_up', upload.none(), (req, res) => {
  const { email, password, phone, type } = req.body
  //   if (!userTypeArr.includes(type)) {
  //     res422(res)
  //     return
  //   }
  if (((email !== '' && email) || (phone !== '' && phone)) && password && password !== '') {
    // res.send({ a: 'xin chao' })
    const param = {
      password,
      email,
      phone,
      type,
      //   ...body,
    }

    const que = {}
    if (email) {
      que.email = email
    }
    if (phone) {
      que.phone = phone
    }

    User.findOne(que)
      .then(r => {
        if (!r) {
          generateHash(param, (error, hashUser) => {
            if (error) {
              res.status(403)
              res.json({
                success: false,
                msg: 'Đăng ký thất bại!',
              })
              return
            }
            const newUser = new User(hashUser)
            newUser.save((err, user) => {
              if (err) {
                res.status(422)
                res.json({ success: false, msg: 'tài khoản đã tồn tại.' })
                return
              }

              const dataUser = user.bindJson()
              const token = jwt.sign(dataUser, secretkey)
              res.json({
                success: true,
                msg: 'Tạo tài khoàn thành công.',
                data: { ...dataUser, token: `${token}` },
              })
            })
          })
        } else {
          res.status(422)
          res.json({ success: false, msg: '.' })
        }
      })
      .catch(() => {
        res.status(422)
        res.json({
          success: false,
          msg: 'Đăng nhập thất bại!',
        })
      })

    return
  }

  res.status(422)
  res.send({ message: 'email hoặc số điện thoại hoặc mật khẩu không đúng định dạng' })
})

authRouters.post('/sign_in', upload.none(), (req, res) => {
  const { email, password, phone } = req.body
  if (((email !== '' && email) || (phone !== '' && phone)) && password && password !== '') {
    const que = {}
    if (email) {
      que.email = email
    }
    if (phone) {
      que.phone = phone
    }
    User.findOne(que)
      .then(r => {
        const dataUser = r.bindJson()
        const token = jwt.sign(dataUser, secretkey)
        res.json({
          success: true,
          msg: 'Đăng nhập thành công.',
          data: { ...dataUser, token: `${token}` },
        })
      })
      .catch(() => {
        res.status(403)
        res.json({
          success: false,
          msg: 'đăng nhập thất bại!',
        })
      })
    return
  }
  res.status(422)
  res.send({ message: 'email hoặc số điện thoại hoặc mật khẩu không đúng định dạng' })
})

// authRouters.post('/sign')

export default authRouters
