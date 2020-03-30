import mongoose from 'mongoose'
import table from '../tableName'
import entity from '../Schemas'

const UserModel = mongoose.model(table.user, entity.User)

export default UserModel
