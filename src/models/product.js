import { Schema, model } from 'mongoose';
import { CATEGORIES } from '../constants/categories.js';

export const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: CATEGORIES,
      default: 'other',
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

productsSchema.index({ category: 1 });

export const Products = model('Products', productsSchema);
