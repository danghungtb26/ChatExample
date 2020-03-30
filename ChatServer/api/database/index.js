import mongoose from 'mongoose'
import { databaseName } from './config'

mongoose.Promise = global.Promise

const options = {
  // db: {
  //   native_parser: true,
  // },
  // server: {
  //   poolSize: 5,
  // },
  autoCreate: true,
  autoIndex: true,
  // user: 'admin',
  // pass: '15150408',
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose
  .connect(databaseName, options)
  .then(() => {
    console.log('connect successfully')
  })
  .catch(err => {
    console.log('connect error', err)
  })
