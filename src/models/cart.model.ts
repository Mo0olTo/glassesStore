
import mongoose, { Schema, Document } from 'mongoose';
import { ICart } from './../interfaces/cart.interface';

type CartDocument = ICart & Document;
const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const cartSchema = new Schema<CartDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    items: [cartItemSchema],

    totalPrice: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model<CartDocument>('Cart', cartSchema);