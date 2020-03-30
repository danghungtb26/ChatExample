import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

const Supplier = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      max: 90,
      min: -90,
    },
    long: {
      type: Number,
      max: 180,
      min: -180,
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

export default Supplier
