import mongoose from 'mongoose'
import table from '../tableName'
import entity from '../Schemas'

const ProductModel = mongoose.model(table.product, entity.Product)

export default ProductModel
