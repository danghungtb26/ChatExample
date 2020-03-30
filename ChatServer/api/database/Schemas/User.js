/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import table from '../tableName'

const { Schema } = mongoose

const User = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    introduction: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
      required: true,
    },
    //   create_date: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   update_date: {
    //     type: Date,
    //     default: Date.now,
    //   },
    type: {
      type: String,
      required: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: table.supplier,
    },
    avatar: {
      type: String,
      default: null,
    },
    point: {
      type: Number,
      default: 0,
    },
    money: {
      type: Number,
      default: 0,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: table.role,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 1,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

User.methods.comparePassword = (passw, cb) => {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      cb(err)
      return
    }
    cb(null, isMatch)
  })
}

User.methods.bindJson = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    introduction: this.introduction,
    avatar: this.avatar,
    point: this.point,
    money: this.money,
    role: this.role,
    type: this.type,
    supplier: this.supplier,
  }
}

export function generateHash(user, callback) {
  const newUser = user
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      callback(err)
    }
    bcrypt.hash(user.password, salt, (err2, hash) => {
      if (err2) {
        callback(err2)
      }
      newUser.password = hash
      callback(null, newUser)
    })
  })
}

export default User
