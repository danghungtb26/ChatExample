import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    short_description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: null,
    },
    statusPrice: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    rate: {
      type: Number,
      max: 5,
      min: 0,
      default: 5,
    },
    total_review: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: table.category,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: table.supplier,
      required: true,
    },
    react_count: {
      type: Number,
      default: 0,
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

export default Product
