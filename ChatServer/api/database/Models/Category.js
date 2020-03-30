import mongoose from 'mongoose'
import table from '../tableName'
import entity from '../Schemas'

const CategoryModel = mongoose.model(table.category, entity.Category)

export default CategoryModel
