/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import table from '../tableName'

const { Schema } = mongoose

const Category = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: null,
    },
    submiter: {
      type: Schema.Types.ObjectId,
      ref: table.user,
    },
    acepter: {
      type: Schema.Types.ObjectId,
      ref: table.user,
    },
    total_products: {
      type: Number,
      default: 0,
    },
    total_news: {
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

Category.methods.bindJson = function() {
  return {
    id: this._id,
    name: this.name,
    image: this.image,
    description: this.description,
    submiter: this.submiter,
    total_products: this.total_products,
    total_news: this.total_news,
    status: this.status,
  }
}

export default Category
